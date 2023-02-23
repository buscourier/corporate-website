import calculatorEffects from '../components/calculator/store/effects/calculator.effects'
import taskFormEffects from '../components/task-form/store/effects/task-form.effects'

export const effects = [...calculatorEffects, ...taskFormEffects]
