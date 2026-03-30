import { ALTERNATIVES } from '../data/alternatives'
import { CONCERN_PLAN } from '../data/concerns'
import { COST_DATA } from '../data/costs'
import { AVOID_DETAILS, INGREDIENT_DB, INGREDIENT_DETAILS } from '../data/ingredients'

function titleToKey(value) {
  return (value || '').toLowerCase()
}

export function getHarshnessLevel(profile) {
  let score = 50
  if (profile.sensitivity === 'High') score += 25
  if (profile.sensitivity === 'Low') score -= 15
  if (profile.experience === 'Beginner') score += 12
  if (profile.experience === 'Advanced') score -= 14
  if (profile.skinType === 'Sensitive') score += 15
  if (profile.skinType === 'Oily') score -= 5
  return Math.max(10, Math.min(95, score))
}

export function buildAnalysis(profile) {
  const skinKey = titleToKey(profile.skinType)
  const recommendedBase = INGREDIENT_DB.recommended[skinKey] || []
  const avoidBase = INGREDIENT_DB.avoid[skinKey] || []

  const concernAdds = (profile.concerns || [])
    .flatMap((concern) => CONCERN_PLAN[concern] || [])
    .filter(Boolean)

  const recommendedNames = [...new Set([...recommendedBase, ...concernAdds])]
    .filter((name) => INGREDIENT_DETAILS[name])

  const recommended = recommendedNames.slice(0, 6).map((name) => ({
    name,
    ...INGREDIENT_DETAILS[name],
  }))

  const avoid = avoidBase.slice(0, 5).map((name) => ({
    name,
    ...(AVOID_DETAILS[name] || {
      risk: 'Moderate',
      reason: 'This ingredient may not match your current profile optimally.',
      warning: 'Use carefully and monitor your skin response.',
    }),
  }))

  const harshness = getHarshnessLevel(profile)
  const bestRoutine = [
    { time: 'AM', step: 'Gentle cleanser', detail: 'Low-stripping cleanser to keep your barrier comfortable.' },
    { time: 'AM', step: recommended[0]?.name || 'Target serum', detail: recommended[0]?.benefit || 'Skin-matching active ingredient.' },
    { time: 'AM', step: 'Moisturizer', detail: 'Barrier-supporting moisturizer suited to your skin type.' },
    { time: 'AM', step: 'Sunscreen SPF 50', detail: 'Daily protection to prevent dark spots, irritation, and premature aging.' },
    { time: 'PM', step: 'Cleanser', detail: 'Remove sunscreen, oil, and impurities without over-cleansing.' },
    { time: 'PM', step: recommended[1]?.name || 'Repair serum', detail: recommended[1]?.benefit || 'Use a targeted night treatment.' },
    { time: 'PM', step: 'Moisturizer', detail: 'Seal in hydration overnight and reduce barrier stress.' },
  ]

  const compare = {
    profileFit: `${profile.skinType || 'Not selected'} / ${profile.sensitivity || 'Not selected'}`,
    harshness,
    budget: profile.budget || 'Not selected',
    experience: profile.experience || 'Not selected',
  }

  return {
    recommended,
    avoid,
    harshness,
    alternatives: ALTERNATIVES,
    costs: COST_DATA,
    routine: bestRoutine,
    compare,
  }
}
