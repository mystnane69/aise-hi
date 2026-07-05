import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Wallet, Stamp, MessageSquare, Activity, Sun, Dumbbell, Moon, SunMedium,
  ChevronLeft, ChevronRight, ArrowUp, ArrowDown, X, Check, Sparkles,
  ChevronDown, ChevronUp, Scale, Loader2, GraduationCap, Briefcase,
  Snowflake, Heart, Globe, Building2, RotateCcw, Train
} from 'lucide-react';

// ---------------------------------------------------------------------------
// 1. DATA
// ---------------------------------------------------------------------------
const COUNTRIES = [
  { id: 'germany', country: 'Germany', flag: '🇩🇪', raw_data: { salary_da: 45000, salary_ds: 55000, rent: 1100, cost_of_living: 950, tax: '40% - 45%', eu_passport: 'Yes', years_to_pr: '1.75 - 2.75 (Blue Card)', post_study_visa_months: 18, english_only_job: 'Yes', hours_to_fluency: 750, healthcare_access: 'Fast', transit_qual: 'Excellent', safety: 'High', climate: 'Temperate', sports: 'World-class', weekly_hours: 33.9, holiday_spots: 'Bavarian Alps, Baltic Coast' }, scores: { financials: 4.9, visa_pr: 8.2, language: 6.9, health_transit: 7.2, environment: 6.7, leisure: 6.4 } },
  { id: 'united-kingdom', country: 'United Kingdom', flag: '🇬🇧', raw_data: { salary_da: 35000, salary_ds: 45000, rent: 1400, cost_of_living: 1000, tax: '35% - 40%', eu_passport: 'No', years_to_pr: '5', post_study_visa_months: 24, english_only_job: 'Yes', hours_to_fluency: 0, healthcare_access: 'Slow for non-emergencies', transit_qual: 'Good, expensive', safety: 'High', climate: 'Temperate Maritime', sports: 'Excellent', weekly_hours: 36.5, holiday_spots: 'Scottish Highlands, Cornwall' }, scores: { financials: 4.4, visa_pr: 4.7, language: 10.0, health_transit: 5.8, environment: 6.6, leisure: 7.3 } },
  { id: 'netherlands', country: 'Netherlands', flag: '🇳🇱', raw_data: { salary_da: 40000, salary_ds: 50000, rent: 1500, cost_of_living: 950, tax: '38% - 45%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 12, english_only_job: 'Yes', hours_to_fluency: 600, healthcare_access: 'Moderate to Fast', transit_qual: 'Excellent (Bike-first)', safety: 'High', climate: 'Temperate Maritime', sports: 'Excellent', weekly_hours: 31.9, holiday_spots: 'Wadden Islands, Zeeland' }, scores: { financials: 4.2, visa_pr: 6.5, language: 7.5, health_transit: 7.4, environment: 6.7, leisure: 6.8 } },
  { id: 'france', country: 'France', flag: '🇫🇷', raw_data: { salary_da: 38000, salary_ds: 45000, rent: 1200, cost_of_living: 900, tax: '40% - 45%', eu_passport: 'Yes', years_to_pr: "5 (or 2 with Master's)", post_study_visa_months: 12, english_only_job: 'Difficult', hours_to_fluency: 600, healthcare_access: 'Fast', transit_qual: 'Excellent (Metro/TGV)', safety: 'Moderate-High', climate: 'Varied', sports: 'Excellent', weekly_hours: 35.0, holiday_spots: 'French Riviera, Chamonix' }, scores: { financials: 4.7, visa_pr: 6.5, language: 4.0, health_transit: 8.5, environment: 6.6, leisure: 7.0 } },
  { id: 'switzerland', country: 'Switzerland', flag: '🇨🇭', raw_data: { salary_da: 85000, salary_ds: 95000, rent: 1800, cost_of_living: 1500, tax: '25% - 32%', eu_passport: 'No (EFTA)', years_to_pr: '10', post_study_visa_months: 6, english_only_job: 'Yes', hours_to_fluency: 600, healthcare_access: 'Extremely Fast', transit_qual: 'World-class', safety: 'Exceptional', climate: 'Alpine/Temperate', sports: 'World-class', weekly_hours: 40.0, holiday_spots: 'Zermatt, Interlaken' }, scores: { financials: 4.9, visa_pr: 2.3, language: 7.5, health_transit: 7.2, environment: 8.1, leisure: 3.2 } },
  { id: 'norway', country: 'Norway', flag: '🇳🇴', raw_data: { salary_da: 55000, salary_ds: 65000, rent: 1300, cost_of_living: 1200, tax: '35% - 40%', eu_passport: 'No (EEA)', years_to_pr: '3', post_study_visa_months: 12, english_only_job: 'Yes', hours_to_fluency: 600, healthcare_access: 'Moderate', transit_qual: 'Good', safety: 'Exceptional', climate: 'Nordic/Coastal', sports: 'Exceptional outdoors', weekly_hours: 36.0, holiday_spots: 'Lofoten, Fjords' }, scores: { financials: 4.7, visa_pr: 5.6, language: 7.5, health_transit: 6.4, environment: 7.3, leisure: 5.1 } },
  { id: 'sweden', country: 'Sweden', flag: '🇸🇪', raw_data: { salary_da: 42000, salary_ds: 50000, rent: 1100, cost_of_living: 900, tax: '35% - 40%', eu_passport: 'Yes', years_to_pr: '4', post_study_visa_months: 12, english_only_job: 'Yes', hours_to_fluency: 600, healthcare_access: 'Moderate to Slow', transit_qual: 'Excellent', safety: 'Very High', climate: 'Nordic', sports: 'Excellent', weekly_hours: 35.5, holiday_spots: 'Gotland, Lapland' }, scores: { financials: 5.4, visa_pr: 6.9, language: 7.5, health_transit: 6.9, environment: 6.9, leisure: 6.8 } },
  { id: 'denmark', country: 'Denmark', flag: '🇩🇰', raw_data: { salary_da: 55000, salary_ds: 65000, rent: 1400, cost_of_living: 1100, tax: '45% - 50%', eu_passport: 'Yes', years_to_pr: '8 (can be 4)', post_study_visa_months: 36, english_only_job: 'Yes', hours_to_fluency: 600, healthcare_access: 'Moderate', transit_qual: 'Excellent', safety: 'Exceptional', climate: 'Temperate', sports: 'Great', weekly_hours: 33.9, holiday_spots: 'Bornholm, Skagen' }, scores: { financials: 3.9, visa_pr: 7.8, language: 7.5, health_transit: 7.2, environment: 7.8, leisure: 6.7 } },
  { id: 'finland', country: 'Finland', flag: '🇫🇮', raw_data: { salary_da: 40000, salary_ds: 48000, rent: 900, cost_of_living: 900, tax: '40% - 48%', eu_passport: 'Yes', years_to_pr: '4', post_study_visa_months: 24, english_only_job: 'Yes', hours_to_fluency: 1100, healthcare_access: 'Fast', transit_qual: 'Very Good', safety: 'Exceptional', climate: 'Nordic/Subarctic', sports: 'Exceptional', weekly_hours: 35.5, holiday_spots: 'Lapland, Lakeland' }, scores: { financials: 5.1, visa_pr: 8.1, language: 5.5, health_transit: 7.3, environment: 7.0, leisure: 7.7 } },
  { id: 'estonia', country: 'Estonia', flag: '🇪🇪', raw_data: { salary_da: 25000, salary_ds: 35000, rent: 650, cost_of_living: 750, tax: '22% (Flat)', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 9, english_only_job: 'Yes', hours_to_fluency: 1100, healthcare_access: 'Moderate', transit_qual: 'Good', safety: 'Very High', climate: 'Humid Continental', sports: 'Good', weekly_hours: 38.0, holiday_spots: 'Pärnu, Saaremaa' }, scores: { financials: 7.4, visa_pr: 6.2, language: 5.5, health_transit: 6.6, environment: 5.9, leisure: 7.3 } },
  { id: 'portugal', country: 'Portugal', flag: '🇵🇹', raw_data: { salary_da: 20000, salary_ds: 28000, rent: 950, cost_of_living: 700, tax: '35% - 40%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 12, english_only_job: 'Yes (Moderate)', hours_to_fluency: 600, healthcare_access: 'Slow', transit_qual: 'Moderate to Good', safety: 'Very High', climate: 'Mediterranean', sports: 'Good', weekly_hours: 39.0, holiday_spots: 'Algarve, Madeira' }, scores: { financials: 5.4, visa_pr: 6.5, language: 5.0, health_transit: 6.1, environment: 8.3, leisure: 5.1 } },
  { id: 'spain', country: 'Spain', flag: '🇪🇸', raw_data: { salary_da: 25000, salary_ds: 32000, rent: 1000, cost_of_living: 750, tax: '30% - 35%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 12, english_only_job: 'Difficult', hours_to_fluency: 600, healthcare_access: 'Moderate', transit_qual: 'Excellent', safety: 'High', climate: 'Mediterranean', sports: 'World-class', weekly_hours: 38.0, holiday_spots: 'Costa del Sol, Islands' }, scores: { financials: 5.8, visa_pr: 6.5, language: 4.0, health_transit: 7.5, environment: 8.0, leisure: 6.1 } },
  { id: 'ireland', country: 'Ireland', flag: '🇮🇪', raw_data: { salary_da: 40000, salary_ds: 50000, rent: 1800, cost_of_living: 1000, tax: '35% - 40%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 24, english_only_job: 'Yes', hours_to_fluency: 0, healthcare_access: 'Slow (Public) / Fast (Private)', transit_qual: 'Moderate', safety: 'High', climate: 'Maritime', sports: 'Good', weekly_hours: 36.0, holiday_spots: 'Cliffs of Moher' }, scores: { financials: 3.9, visa_pr: 7.7, language: 10.0, health_transit: 5.4, environment: 6.4, leisure: 5.1 } },
  { id: 'italy', country: 'Italy', flag: '🇮🇹', raw_data: { salary_da: 28000, salary_ds: 35000, rent: 900, cost_of_living: 850, tax: '35% - 43%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 12, english_only_job: 'Extremely Difficult', hours_to_fluency: 600, healthcare_access: 'Moderate', transit_qual: 'Good', safety: 'Moderate-High', climate: 'Mediterranean', sports: 'Good', weekly_hours: 38.0, holiday_spots: 'Amalfi, Dolomites' }, scores: { financials: 5.3, visa_pr: 6.5, language: 3.0, health_transit: 7.6, environment: 7.1, leisure: 4.4 } },
  { id: 'austria', country: 'Austria', flag: '🇦🇹', raw_data: { salary_da: 40000, salary_ds: 48000, rent: 950, cost_of_living: 900, tax: '40% - 45%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 12, english_only_job: 'Moderate', hours_to_fluency: 750, healthcare_access: 'Fast', transit_qual: 'World-class', safety: 'Exceptional', climate: 'Continental/Alpine', sports: 'World-class', weekly_hours: 34.0, holiday_spots: 'Tyrolean Alps' }, scores: { financials: 5.2, visa_pr: 6.5, language: 4.4, health_transit: 8.9, environment: 8.4, leisure: 7.8 } },
  { id: 'poland', country: 'Poland', flag: '🇵🇱', raw_data: { salary_da: 20000, salary_ds: 28000, rent: 750, cost_of_living: 650, tax: '28% - 35%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 9, english_only_job: 'Yes', hours_to_fluency: 1100, healthcare_access: 'Slow (Public) / Fast (Private)', transit_qual: 'Good', safety: 'High', climate: 'Continental', sports: 'Good', weekly_hours: 38.7, holiday_spots: 'Tatra Mountains, Baltic Sea' }, scores: { financials: 6.4, visa_pr: 6.2, language: 5.5, health_transit: 7.3, environment: 5.8, leisure: 5.7 } },
  { id: 'czech-republic', country: 'Czech Republic', flag: '🇨🇿', raw_data: { salary_da: 25000, salary_ds: 32000, rent: 850, cost_of_living: 750, tax: '25% - 30%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 9, english_only_job: 'Yes', hours_to_fluency: 1100, healthcare_access: 'Fast', transit_qual: 'Excellent', safety: 'High', climate: 'Continental', sports: 'Good', weekly_hours: 38.0, holiday_spots: 'Bohemian Switzerland' }, scores: { financials: 6.5, visa_pr: 6.2, language: 5.5, health_transit: 8.3, environment: 6.1, leisure: 5.1 } },
  { id: 'romania', country: 'Romania', flag: '🇷🇴', raw_data: { salary_da: 18000, salary_ds: 25000, rent: 500, cost_of_living: 600, tax: '35%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 9, english_only_job: 'Yes', hours_to_fluency: 600, healthcare_access: 'Slow', transit_qual: 'Moderate', safety: 'Moderate-High', climate: 'Continental', sports: 'Moderate', weekly_hours: 39.5, holiday_spots: 'Transylvania, Black Sea' }, scores: { financials: 6.6, visa_pr: 6.2, language: 7.5, health_transit: 6.0, environment: 5.4, leisure: 4.4 } },
  { id: 'lithuania', country: 'Lithuania', flag: '🇱🇹', raw_data: { salary_da: 22000, salary_ds: 30000, rent: 650, cost_of_living: 700, tax: '30% - 35%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 15, english_only_job: 'Yes', hours_to_fluency: 1100, healthcare_access: 'Moderate', transit_qual: 'Good', safety: 'High', climate: 'Continental', sports: 'Great', weekly_hours: 38.4, holiday_spots: 'Curonian Spit, Trakai' }, scores: { financials: 6.4, visa_pr: 6.8, language: 5.5, health_transit: 6.3, environment: 5.3, leisure: 5.3 } },
  { id: 'hungary', country: 'Hungary', flag: '🇭🇺', raw_data: { salary_da: 20000, salary_ds: 28000, rent: 600, cost_of_living: 650, tax: '33%', eu_passport: 'Yes', years_to_pr: '3', post_study_visa_months: 9, english_only_job: 'Yes', hours_to_fluency: 1100, healthcare_access: 'Slow', transit_qual: 'Very Good', safety: 'High', climate: 'Continental', sports: 'Good', weekly_hours: 39.0, holiday_spots: 'Lake Balaton' }, scores: { financials: 6.5, visa_pr: 7.0, language: 5.5, health_transit: 6.7, environment: 6.6, leisure: 4.8 } },
  { id: 'luxembourg', country: 'Luxembourg', flag: '🇱🇺', raw_data: { salary_da: 55000, salary_ds: 65000, rent: 1700, cost_of_living: 1100, tax: '35% - 40%', eu_passport: 'Yes', years_to_pr: '5', post_study_visa_months: 9, english_only_job: 'Moderate', hours_to_fluency: 600, healthcare_access: 'Fast', transit_qual: 'Very Good', safety: 'Exceptional', climate: 'Temperate', sports: 'Excellent', weekly_hours: 38.0, holiday_spots: 'Mullerthal' }, scores: { financials: 4.3, visa_pr: 6.2, language: 5.0, health_transit: 7.6, environment: 8.1, leisure: 6.5 } },
];

const PILLARS = [
  { key: 'financials', label: 'Financials', icon: Wallet, ring: 'text-emerald-500', bar: 'bg-emerald-500' },
  { key: 'visa_pr', label: 'Visa & PR Pathways', icon: Stamp, ring: 'text-indigo-500', bar: 'bg-indigo-500' },
  { key: 'language', label: 'Language & Integration', icon: MessageSquare, ring: 'text-sky-500', bar: 'bg-sky-500' },
  { key: 'health_transit', label: 'Health & Transport', icon: Activity, ring: 'text-rose-500', bar: 'bg-rose-500' },
  { key: 'environment', label: 'Climate & Environment', icon: Sun, ring: 'text-amber-500', bar: 'bg-amber-500' },
  { key: 'leisure', label: 'Leisure & Culture', icon: Dumbbell, ring: 'text-fuchsia-500', bar: 'bg-fuchsia-500' },
];

const WEIGHT_TABLE = [1.0, 0.8, 0.6, 0.4, 0.2, 0.1];

const QUESTIONS = [
  { id: 'career', icon: Briefcase, text: 'What is your primary career target?', options: [
    { value: 'analyst', label: 'Data Analyst' },
    { value: 'scientist', label: 'Data Scientist' } ] },
  { id: 'language', icon: MessageSquare, text: 'How do you feel about learning local European languages?', options: [
    { value: 'any_language', label: 'Willing to learn any language' },
    { value: 'english_friendly', label: 'Prefer English-friendly hubs' },
    { value: 'english_only', label: 'English-only environments only' } ] },
  { id: 'gateway', icon: GraduationCap, text: 'What is your primary immigration gateway strategy?', options: [
    { value: 'masters', label: "Apply for higher education / Master's first" },
    { value: 'direct_job', label: 'Apply directly for international tech jobs' } ] },
  { id: 'hours', icon: Building2, text: 'What is your priority regarding corporate work hours?', options: [
    { value: 'strict_wlb', label: 'Strict work-life balance / < 35 hrs' },
    { value: 'standard', label: 'Standard corporate output is fine' } ] },
  { id: 'healthcare', icon: Heart, text: 'How do you view healthcare accessibility?', options: [
    { value: 'speed_private', label: 'Speed & private insurance integration is critical' },
    { value: 'tax_funded', label: 'Tax-funded slow access is acceptable' } ] },
  { id: 'transit', icon: Train, text: 'What type of local transit matches your daily routine?', options: [
    { value: 'world_class', label: 'World-class public transit & cycling networks' },
    { value: 'basic', label: 'Basic commuter bus systems are fine' } ] },
  { id: 'winter', icon: Snowflake, text: 'How do you handle severe winter weather conditions?', options: [
    { value: 'nordic', label: 'Love distinct winter / Nordic snowfall' },
    { value: 'mediterranean', label: 'Prefer mild Mediterranean climates' } ] },
  { id: 'sports', icon: Dumbbell, text: 'How vital is local sports infrastructure to your routine?', options: [
    { value: 'crucial', label: 'Crucial component of lifestyle' },
    { value: 'secondary', label: 'Secondary requirement' } ] },
  { id: 'holidays', icon: Globe, text: 'How often do you plan to take weekend regional holidays?', options: [
    { value: 'frequent_budget', label: 'Frequently / budget-friendly options preferred' },
    { value: 'occasional_high_budget', label: 'Occasionally / high budgets fine' } ] },
  { id: 'finance', icon: Wallet, text: 'What is your immediate financial strategy?', options: [
    { value: 'maximize_savings', label: 'Maximize immediate savings potential' },
    { value: 'long_term_pr', label: 'Long-term residency / PR tracking focus' } ] },
];

// ---------------------------------------------------------------------------
// 2. SCORING ENGINE
// ---------------------------------------------------------------------------
function parseTaxRate(taxStr) {
  const nums = (taxStr.match(/\d+(\.\d+)?/g) || []).map(Number);
  if (nums.length === 0) return 0.3;
  return (nums.reduce((a, b) => a + b, 0) / nums.length) / 100;
}

function minMax10(values) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  if (max === min) return values.map(() => 5);
  return values.map(v => ((v - min) / (max - min)) * 10);
}

function climateAccent(climate) {
  if (/Nordic|Subarctic/.test(climate)) return 'text-sky-400';
  if (/Alpine/.test(climate)) return 'text-indigo-400';
  if (/Mediterranean/.test(climate)) return 'text-amber-400';
  if (/Maritime/.test(climate)) return 'text-emerald-400';
  return 'text-violet-400';
}

function computeResults(answers, priorityOrder) {
  let pool = COUNTRIES.slice();
  if (answers.language === 'english_only') {
    pool = pool.filter(c => !['Difficult', 'Extremely Difficult'].includes(c.raw_data.english_only_job));
  }
  if (pool.length === 0) pool = COUNTRIES.slice();

  const salaryKey = answers.career === 'scientist' ? 'salary_ds' : 'salary_da';
  const costMultiplier = answers.finance === 'maximize_savings' ? 1.3 : 1.0;

  const finRaw = pool.map(c => {
    const salary = c.raw_data[salaryKey];
    const tax = parseTaxRate(c.raw_data.tax);
    const annualCost = (c.raw_data.rent + c.raw_data.cost_of_living) * 12 * costMultiplier;
    return salary * (1 - tax) - annualCost;
  });
  const finNorm = minMax10(finRaw);

  const colInvNorm = minMax10(pool.map(c => -c.raw_data.cost_of_living));

  const withRaw = pool.map((c, i) => {
    let visa = c.scores.visa_pr;
    let language = c.scores.language;
    let health = c.scores.health_transit;
    let env = c.scores.environment;
    let leisure = c.scores.leisure;

    if (answers.language === 'english_friendly' && language >= 7.0) {
      language = Math.min(10, language * 1.10);
    }

    if (answers.gateway === 'masters') {
      const mastersBonus = /master/i.test(c.raw_data.years_to_pr) ? 1.0 : 0;
      visa += mastersBonus + (c.raw_data.post_study_visa_months / 36) * 1.5;
    } else if (answers.gateway === 'direct_job') {
      const map = { Yes: 1.0, 'Yes (Moderate)': 0.5, Moderate: 0.3 };
      visa += map[c.raw_data.english_only_job] || 0;
    }
    if (answers.finance === 'long_term_pr') visa += 0.5;

    if (answers.healthcare === 'speed_private') {
      const hmap = { 'Extremely Fast': 1.5, Fast: 1.0, 'Moderate to Fast': 0.6, Moderate: 0.2 };
      health += hmap[c.raw_data.healthcare_access] || 0;
    }
    if (answers.transit === 'world_class') {
      const tq = c.raw_data.transit_qual;
      if (tq.includes('World-class')) health += 1.2;
      else if (tq.includes('Excellent')) health += 0.8;
      else if (tq.includes('Very Good')) health += 0.5;
      else if (tq.includes('Good')) health += 0.2;
    }

    const climate = c.raw_data.climate;
    if (answers.winter === 'nordic' && /(Nordic|Alpine|Subarctic)/.test(climate)) env += 1.0;
    if (answers.winter === 'mediterranean' && /Mediterranean/.test(climate)) env += 1.0;
    if (answers.hours === 'strict_wlb') env += Math.max(0, (40 - c.raw_data.weekly_hours) * 0.15);

    if (answers.sports === 'crucial') {
      const smap = { 'World-class': 1.0, Exceptional: 0.8, 'Exceptional outdoors': 0.8, Excellent: 0.6, Great: 0.4, Good: 0.2 };
      leisure += smap[c.raw_data.sports] || 0;
    }
    if (answers.holidays === 'frequent_budget') leisure += colInvNorm[i] * 0.15;

    return { ...c, pillarsRaw: { financials: finNorm[i], visa_pr: visa, language, health_transit: health, environment: env, leisure } };
  });

  const pillarKeys = ['visa_pr', 'language', 'health_transit', 'environment', 'leisure'];
  const normalized = {};
  pillarKeys.forEach(key => {
    normalized[key] = minMax10(withRaw.map(r => r.pillarsRaw[key]));
  });

  const weightsByPillar = {};
  priorityOrder.forEach((key, idx) => { weightsByPillar[key] = WEIGHT_TABLE[idx]; });
  const totalWeight = Object.values(weightsByPillar).reduce((a, b) => a + b, 0);

  const final = withRaw.map((r, i) => {
    const pillars = {
      financials: r.pillarsRaw.financials,
      visa_pr: normalized.visa_pr[i],
      language: normalized.language[i],
      health_transit: normalized.health_transit[i],
      environment: normalized.environment[i],
      leisure: normalized.leisure[i],
    };
    let sum = 0;
    Object.keys(pillars).forEach(key => { sum += (pillars[key] / 10) * weightsByPillar[key]; });
    return { ...r, pillars, score: (sum / totalWeight) * 100 };
  });

  return final.sort((a, b) => b.score - a.score);
}

// ---------------------------------------------------------------------------
// 3. SMALL PRESENTATION PIECES
// ---------------------------------------------------------------------------
function RadialProgress({ percentage, colorClass, size = 96 }) {
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (Math.max(0, Math.min(100, percentage)) / 100) * circumference;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox="0 0 100 100" className="-rotate-90">
        <circle cx="50" cy="50" r={radius} strokeWidth="8" fill="none" className="stroke-zinc-800" />
        <circle
          cx="50" cy="50" r={radius} strokeWidth="8" fill="none" strokeLinecap="round"
          className={colorClass}
          stroke="currentColor"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 1.1s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-xl font-bold tabular-nums">{percentage.toFixed(0)}%</span>
        <span className="text-xs uppercase tracking-wider opacity-50 scale-90">match</span>
      </div>
    </div>
  );
}

function PillarBar({ pillar, value, dark }) {
  const Icon = pillar.icon;
  return (
    <div className="flex items-center gap-2 text-xs">
      <Icon size={13} className={`${pillar.ring} shrink-0`} />
      <span className={`w-36 shrink-0 truncate ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>{pillar.label}</span>
      <div className={`h-1.5 flex-1 rounded-full overflow-hidden ${dark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
        <div
          className={`h-full rounded-full ${pillar.bar}`}
          style={{ width: `${value * 10}%`, transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        />
      </div>
      <span className="w-8 text-right tabular-nums opacity-70">{value.toFixed(1)}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 4. MAIN APP
// ---------------------------------------------------------------------------
export default function App() {
  const [dark, setDark] = useState(true);
  const [stage, setStage] = useState('quiz'); // quiz | stacker | loading | dashboard
  const [quizStep, setQuizStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [priorityOrder, setPriorityOrder] = useState(PILLARS.map(p => p.key));
  const [results, setResults] = useState([]);
  const [loadingPct, setLoadingPct] = useState(0);
  const [expanded, setExpanded] = useState(null);
  const [compareSet, setCompareSet] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);

  const bg = dark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-50 text-zinc-900';
  const card = dark ? 'bg-white/5 border-zinc-800' : 'bg-white/70 border-zinc-200';
  const subtext = dark ? 'text-zinc-400' : 'text-zinc-500';
  const inputBorder = dark ? 'border-zinc-700 hover:border-indigo-500' : 'border-zinc-300 hover:border-indigo-500';

  const selectAnswer = useCallback((qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }));
    setTimeout(() => {
      if (quizStep < QUESTIONS.length - 1) {
        setQuizStep(s => s + 1);
      } else {
        setStage('stacker');
      }
    }, 220);
  }, [quizStep]);

  const movePriority = (index, dir) => {
    setPriorityOrder(prev => {
      const next = prev.slice();
      const target = index + dir;
      if (target < 0 || target >= next.length) return prev;
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const runAnalysis = () => {
    setStage('loading');
    setLoadingPct(0);
  };

  useEffect(() => {
    if (stage !== 'loading') return;
    const start = Date.now();
    const duration = 2000;
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setLoadingPct(pct);
      if (elapsed >= duration) {
        clearInterval(timer);
        const computed = computeResults(answers, priorityOrder);
        setResults(computed);
        setStage('dashboard');
      }
    }, 40);
    return () => clearInterval(timer);
  }, [stage]); // eslint-disable-line

  const topFive = useMemo(() => results.slice(0, 5), [results]);

  const restart = () => {
    setStage('quiz');
    setQuizStep(0);
    setAnswers({});
    setPriorityOrder(PILLARS.map(p => p.key));
    setResults([]);
    setExpanded(null);
    setCompareSet([]);
    setCompareOpen(false);
  };

  const toggleCompare = (id) => {
    setCompareSet(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 2) return [prev[1], id];
      return [...prev, id];
    });
  };

  const stageIndex = { quiz: 0, stacker: 1, loading: 2, dashboard: 2 }[stage];
  const STAGE_LABELS = ['Persona Quiz', 'Priority Stacker', 'Matchmaker Dashboard'];

  return (
    <div className={`min-h-screen w-full ${bg} font-sans transition-colors duration-300`}>
      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes drawerIn { from { opacity: 0; transform: translateX(40px); } to { opacity: 1; transform: translateX(0); } }
        .animate-slidein { animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
        .animate-fadeup { animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) both; }
        .animate-drawerin { animation: drawerIn 0.35s cubic-bezier(0.16, 1, 0.3, 1); }
      `}</style>

      {/* Header */}
      <header className="max-w-5xl mx-auto px-6 pt-8 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-indigo-500" />
          <span className="font-bold tracking-tight text-lg">EU Data Career Compass</span>
        </div>
        <button
          onClick={() => setDark(d => !d)}
          className={`p-2 rounded-full border ${dark ? 'border-zinc-800 hover:bg-zinc-900' : 'border-zinc-200 hover:bg-zinc-100'} transition-colors`}
          aria-label="Toggle theme"
        >
          {dark ? <SunMedium size={16} /> : <Moon size={16} />}
        </button>
      </header>

      {/* Stepper */}
      <div className="max-w-5xl mx-auto px-6 mb-10">
        <div className="flex items-center">
          {STAGE_LABELS.map((label, i) => (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center gap-1.5">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold border transition-colors duration-300 ${
                    i < stageIndex
                      ? 'bg-indigo-500 border-indigo-500 text-white'
                      : i === stageIndex
                      ? `border-indigo-500 text-indigo-500 ${dark ? 'bg-indigo-500/10' : 'bg-indigo-50'}`
                      : `${dark ? 'border-zinc-800 text-zinc-600' : 'border-zinc-300 text-zinc-400'}`
                  }`}
                >
                  {i < stageIndex ? <Check size={14} /> : i + 1}
                </div>
                <span className={`text-xs whitespace-nowrap ${i === stageIndex ? 'font-medium' : subtext}`}>{label}</span>
              </div>
              {i < STAGE_LABELS.length - 1 && (
                <div className={`flex-1 h-px mx-2 mb-4 ${i < stageIndex ? 'bg-indigo-500' : dark ? 'bg-zinc-800' : 'bg-zinc-300'}`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-6 pb-24">
        {stage === 'quiz' && (
          <QuizStage
            step={quizStep}
            setStep={setQuizStep}
            answers={answers}
            selectAnswer={selectAnswer}
            card={card}
            subtext={subtext}
            inputBorder={inputBorder}
            dark={dark}
          />
        )}

        {stage === 'stacker' && (
          <PriorityStage
            priorityOrder={priorityOrder}
            movePriority={movePriority}
            runAnalysis={runAnalysis}
            card={card}
            subtext={subtext}
            dark={dark}
            goBack={() => { setStage('quiz'); setQuizStep(QUESTIONS.length - 1); }}
          />
        )}

        {stage === 'loading' && <LoadingStage pct={loadingPct} dark={dark} />}

        {stage === 'dashboard' && (
          <DashboardStage
            topFive={topFive}
            expanded={expanded}
            setExpanded={setExpanded}
            compareSet={compareSet}
            toggleCompare={toggleCompare}
            setCompareOpen={setCompareOpen}
            card={card}
            subtext={subtext}
            dark={dark}
            restart={restart}
          />
        )}
      </main>

      {compareOpen && compareSet.length === 2 && (
        <CompareDrawer
          countries={compareSet.map(id => results.find(r => r.id === id))}
          onClose={() => setCompareOpen(false)}
          dark={dark}
          card={card}
          subtext={subtext}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 5. QUIZ STAGE
// ---------------------------------------------------------------------------
function QuizStage({ step, setStep, answers, selectAnswer, card, subtext, inputBorder, dark }) {
  const q = QUESTIONS[step];
  const Icon = q.icon;
  return (
    <div>
      <div className="flex items-center gap-2 mb-6">
        {QUESTIONS.map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === step ? 'w-8 bg-indigo-500' : i < step ? 'w-4 bg-indigo-500/50' : `w-4 ${dark ? 'bg-zinc-800' : 'bg-zinc-200'}`
            }`}
          />
        ))}
      </div>

      <div key={step} className={`animate-slidein border rounded-2xl p-8 backdrop-blur-md ${card}`}>
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-medium uppercase tracking-wider ${subtext}`}>Question {step + 1} of {QUESTIONS.length}</span>
        </div>
        <div className="flex items-start gap-3 mb-8">
          <div className={`p-2 rounded-xl ${dark ? 'bg-indigo-500/10' : 'bg-indigo-50'}`}>
            <Icon size={20} className="text-indigo-500" />
          </div>
          <h2 className="text-xl font-semibold leading-snug pt-1.5">{q.text}</h2>
        </div>

        <div className="grid gap-3">
          {q.options.map(opt => {
            const selected = answers[q.id] === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => selectAnswer(q.id, opt.value)}
                className={`text-left px-5 py-4 rounded-xl border transition-all duration-200 ${
                  selected
                    ? 'border-indigo-500 bg-indigo-500/10'
                    : `${inputBorder} ${dark ? 'bg-zinc-900/40' : 'bg-white/40'}`
                }`}
              >
                <span className="text-sm font-medium">{opt.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex justify-between mt-8">
          <button
            onClick={() => step > 0 && setStep(step - 1)}
            disabled={step === 0}
            className={`flex items-center gap-1 text-sm px-4 py-2 rounded-lg disabled:opacity-30 ${dark ? 'hover:bg-zinc-900' : 'hover:bg-zinc-100'} transition-colors`}
          >
            <ChevronLeft size={16} /> Back
          </button>
          <span className={`text-xs self-center ${subtext}`}>Tap an option to continue</span>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 6. PRIORITY STACKER STAGE
// ---------------------------------------------------------------------------
function PriorityStage({ priorityOrder, movePriority, runAnalysis, card, subtext, dark, goBack }) {
  return (
    <div className="animate-fadeup">
      <h2 className="text-xl font-semibold mb-1">Rank what matters most</h2>
      <p className={`text-sm mb-6 ${subtext}`}>Order the six pillars from most (1st) to least (6th) important. Your ranking directly weights the final compatibility score.</p>

      <div className={`border rounded-2xl p-3 backdrop-blur-md ${card}`}>
        {priorityOrder.map((key, index) => {
          const pillar = PILLARS.find(p => p.key === key);
          const Icon = pillar.icon;
          return (
            <div
              key={key}
              className={`flex items-center gap-4 p-4 rounded-xl ${index !== priorityOrder.length - 1 ? (dark ? 'border-b border-zinc-800' : 'border-b border-zinc-200') : ''}`}
            >
              <span className={`w-6 text-center font-bold text-sm ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>{index + 1}</span>
              <div className={`p-2 rounded-lg ${dark ? 'bg-zinc-900' : 'bg-zinc-100'}`}>
                <Icon size={16} className={pillar.ring} />
              </div>
              <span className="flex-1 text-sm font-medium">{pillar.label}</span>
              <span className={`text-xs tabular-nums ${subtext}`}>×{WEIGHT_TABLE[index].toFixed(1)}</span>
              <div className="flex gap-1">
                <button
                  onClick={() => movePriority(index, -1)}
                  disabled={index === 0}
                  className={`p-1.5 rounded-md disabled:opacity-20 ${dark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-200'} transition-colors`}
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={() => movePriority(index, 1)}
                  disabled={index === priorityOrder.length - 1}
                  className={`p-1.5 rounded-md disabled:opacity-20 ${dark ? 'hover:bg-zinc-800' : 'hover:bg-zinc-200'} transition-colors`}
                >
                  <ArrowDown size={14} />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex justify-between mt-6">
        <button onClick={goBack} className={`flex items-center gap-1 text-sm px-4 py-2 rounded-lg ${dark ? 'hover:bg-zinc-900' : 'hover:bg-zinc-100'} transition-colors`}>
          <ChevronLeft size={16} /> Back to quiz
        </button>
        <button
          onClick={runAnalysis}
          className="flex items-center gap-2 text-sm font-semibold px-6 py-2.5 rounded-lg bg-indigo-500 hover:bg-indigo-400 text-white transition-colors"
        >
          Run Matchmaker Analysis <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 7. LOADING STAGE
// ---------------------------------------------------------------------------
function LoadingStage({ pct, dark }) {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-fadeup">
      <Loader2 size={36} className="text-indigo-500 animate-spin mb-6" />
      <div className="text-2xl font-bold tabular-nums mb-2">{pct.toFixed(0)}%</div>
      <div className={`text-sm mb-6 ${dark ? 'text-zinc-400' : 'text-zinc-500'}`}>Analyzing Matrix Data...</div>
      <div className={`w-64 h-1.5 rounded-full overflow-hidden ${dark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
        <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${pct}%`, transition: 'width 0.05s linear' }} />
      </div>
      <div className={`text-xs mt-4 ${dark ? 'text-zinc-600' : 'text-zinc-400'}`}>
        Cross-referencing 21 markets across 6 weighted pillars
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// 8. DASHBOARD STAGE
// ---------------------------------------------------------------------------
function DashboardStage({ topFive, expanded, setExpanded, compareSet, toggleCompare, setCompareOpen, card, subtext, dark, restart }) {
  return (
    <div className="animate-fadeup">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold">Your Top 5 Career Hubs</h2>
          <p className={`text-sm ${subtext}`}>Ranked by weighted compatibility across your prioritized pillars.</p>
        </div>
        <button
          onClick={restart}
          className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border ${dark ? 'border-zinc-800 hover:bg-zinc-900' : 'border-zinc-200 hover:bg-zinc-100'} transition-colors`}
        >
          <RotateCcw size={13} /> Start over
        </button>
      </div>

      <div className="grid gap-4">
        {topFive.map((c, i) => {
          const isExpanded = expanded === c.id;
          const inCompare = compareSet.includes(c.id);
          const accent = climateAccent(c.raw_data.climate);
          return (
            <div key={c.id} className={`border rounded-2xl backdrop-blur-md overflow-hidden ${card}`} style={{ animationDelay: `${i * 60}ms` }}>
              <div className="p-5 flex items-center gap-5">
                <span className={`text-lg font-bold w-6 ${dark ? 'text-zinc-700' : 'text-zinc-300'}`}>{i + 1}</span>
                <RadialProgress percentage={c.score} colorClass={accent} size={80} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{c.flag}</span>
                    <h3 className="font-semibold text-lg truncate">{c.country}</h3>
                  </div>
                  <div className={`text-xs mt-1 flex flex-wrap gap-x-3 gap-y-1 ${subtext}`}>
                    <span>€{c.raw_data.salary_da.toLocaleString()}–€{c.raw_data.salary_ds.toLocaleString()}/yr</span>
                    <span>{c.raw_data.tax} tax</span>
                    <span>{c.raw_data.climate}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <button
                    onClick={() => toggleCompare(c.id)}
                    className={`flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                      inCompare
                        ? 'border-indigo-500 bg-indigo-500/10 text-indigo-400'
                        : `${dark ? 'border-zinc-700 hover:bg-zinc-900' : 'border-zinc-300 hover:bg-zinc-100'}`
                    }`}
                  >
                    <Scale size={12} /> {inCompare ? 'Selected' : 'Compare'}
                  </button>
                  <button
                    onClick={() => setExpanded(isExpanded ? null : c.id)}
                    className={`flex items-center gap-1 text-xs ${subtext} hover:text-indigo-400 transition-colors`}
                  >
                    {isExpanded ? 'Hide breakdown' : 'Show breakdown'}
                    {isExpanded ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className={`px-5 pb-5 pt-1 grid gap-2 border-t ${dark ? 'border-zinc-800' : 'border-zinc-200'} animate-fadeup`}>
                  <div className="pt-4 grid gap-2.5">
                    {PILLARS.map(p => (
                      <PillarBar key={p.key} pillar={p} value={c.pillars[p.key]} dark={dark} />
                    ))}
                  </div>
                  <div className={`text-xs mt-2 ${subtext}`}>Signature holiday spots: {c.raw_data.holiday_spots}</div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {compareSet.length === 2 && (
        <button
          onClick={() => setCompareOpen(true)}
          className="fixed bottom-6 right-6 flex items-center gap-2 bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-semibold px-5 py-3 rounded-full shadow-lg shadow-indigo-500/30 transition-colors"
        >
          <Scale size={16} /> Compare {compareSet.length}/2
        </button>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// 9. COMPARE DRAWER
// ---------------------------------------------------------------------------
function CompareDrawer({ countries, onClose, dark, card, subtext }) {
  const fields = [
    ['Data Analyst Salary', c => `€${c.raw_data.salary_da.toLocaleString()}`],
    ['Data Scientist Salary', c => `€${c.raw_data.salary_ds.toLocaleString()}`],
    ['Avg. Rent', c => `€${c.raw_data.rent.toLocaleString()}/mo`],
    ['Cost of Living', c => `€${c.raw_data.cost_of_living.toLocaleString()}/mo`],
    ['Tax Bracket', c => c.raw_data.tax],
    ['EU Passport', c => c.raw_data.eu_passport],
    ['Years to PR', c => c.raw_data.years_to_pr],
    ['Post-Study Visa', c => `${c.raw_data.post_study_visa_months} mo`],
    ['English-Only Jobs', c => c.raw_data.english_only_job],
    ['Healthcare Access', c => c.raw_data.healthcare_access],
    ['Transit Quality', c => c.raw_data.transit_qual],
    ['Safety', c => c.raw_data.safety],
    ['Climate', c => c.raw_data.climate],
    ['Weekly Hours', c => `${c.raw_data.weekly_hours}h`],
  ];
  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className={`relative animate-drawerin w-full max-w-xl h-full overflow-y-auto p-6 border-l ${dark ? 'bg-zinc-950 border-zinc-800' : 'bg-white border-zinc-200'}`}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Direct Comparison</h3>
          <button onClick={onClose} className={`p-2 rounded-full ${dark ? 'hover:bg-zinc-900' : 'hover:bg-zinc-100'}`}>
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          {countries.map(c => (
            <div key={c.id} className={`border rounded-xl p-4 text-center ${card}`}>
              <div className="text-3xl mb-1">{c.flag}</div>
              <div className="font-semibold">{c.country}</div>
              <div className="text-indigo-400 font-bold text-lg mt-1">{c.score.toFixed(0)}%</div>
            </div>
          ))}
        </div>

        <div className="mb-6">
          <div className={`text-xs uppercase tracking-wider mb-2 ${subtext}`}>Pillar breakdown</div>
          <div className="grid gap-3">
            {PILLARS.map(p => (
              <div key={p.key}>
                <div className="flex items-center gap-1.5 mb-1 text-xs font-medium">
                  <p.icon size={12} className={p.ring} /> {p.label}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {countries.map(c => (
                    <div key={c.id} className={`h-1.5 rounded-full overflow-hidden ${dark ? 'bg-zinc-800' : 'bg-zinc-200'}`}>
                      <div className={`h-full rounded-full ${p.bar}`} style={{ width: `${c.pillars[p.key] * 10}%` }} />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className={`text-xs uppercase tracking-wider mb-2 ${subtext}`}>Raw data</div>
          <table className="w-full text-xs">
            <tbody>
              {fields.map(([label, fn]) => (
                <tr key={label} className={dark ? 'border-b border-zinc-900' : 'border-b border-zinc-100'}>
                  <td className={`py-2 pr-2 ${subtext}`}>{label}</td>
                  {countries.map(c => (
                    <td key={c.id} className="py-2 font-medium">{fn(c)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
