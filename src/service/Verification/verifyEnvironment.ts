import { MaximoClient, MaximoClientConfig } from 'maximo-api-client';
import { MaximoEnvironment } from '../../webview/EnvironmentManager';
import { convertAuthType, getLogLevel } from '../../utils/utils';

export interface VerificationResult {
  success: boolean;
  message: string;
}

/**
 * Shared verification logic used by any environment editing surface.
 * Performs a lightweight whoAmI call to validate connectivity & auth.
 */
export async function verifyEnvironment(env: MaximoEnvironment): Promise<VerificationResult> {
  try {
    const clientConfig: MaximoClientConfig = {
      baseUrl: env.hostname,
      port: Number(env.port),
      ssl: env.httpProtocol === 'https',
      authType: convertAuthType(env.authenticationType),
      userName: env.username,
      password: env.password,
      apiKey: env.apikey,
      logLevel: getLogLevel(env.logLevel),
      leanMode: true,
      autoAuthenticate: true,
      rejectUnauthorized: !env.ignoreSslErrors,
      autoscriptObjectStructure: env.objectStructure,
      ca: env.sslcertificate ? env.sslcertificate : undefined,
    };

    const client = new MaximoClient(clientConfig);
    const whoamiResponse = await client.oslcInfoService.getWhoAmI();

    return {
      success: true,
      message: `Verification successful. Connected as: ${whoamiResponse.displayName || whoamiResponse.loginID}`
    };
  } catch (error: any) {
    let errorMessage = 'Verification failed.';
    if (error?.message) {
      errorMessage = `Verification failed: ${error.message}`;
    } else if (error?.code) {
      errorMessage = `Verification failed: ${error.code}`;
    }
    return { success: false, message: errorMessage };
  }
}
