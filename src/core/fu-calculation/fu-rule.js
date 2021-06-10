/**
 * Fu rule interface
 *
 * @interface FuRule
 * @memberof FuCalculation
 */

/**
 * Function called by the fu calculator to know what fu are allowed according to this rule.
 *
 * @function
 * @name FuCalculation.FuRule#check
 * @param {Hand} hand - Hand to apply the rule onto
 * @param {FuCalculation.FuCalculationContext} context - Context of the fu calculation process
 * @returns {(undefined|FuCalculation.FuInfo|FuCalculation.FuInfo[])}
 */
