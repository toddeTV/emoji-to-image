import type { Strategy } from "#ui/types";
import { mergeConfig } from "#ui/utils";
// import * as uiConfig from "#ui/ui.config";

/**
 * Use example:
 *   import { card } from "#ui/ui.config";
 *   const nuxtUiConfigCard = getNuxtUiConfig<typeof card>("card", card)
 */
export function getNuxtUiConfig<T>(componentName: string, component: T) {
  const appConfig = useAppConfig();

  const strategy: Strategy = (appConfig.ui.strategy ?? "merge") as Strategy;

  const appConfigUI =
    // @ts-ignore //TOIDO fix
    componentName in appConfig.ui ? appConfig.ui[componentName] : {};

  return mergeConfig<T>(strategy, appConfigUI, component);
}
