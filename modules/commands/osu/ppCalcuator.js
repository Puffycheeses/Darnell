const parser = require('osu-parser');
const path = require('path');

// Referring to these documents
// https://github.com/ppy/osu-performance/blob/master/src/performance/mania/ManiaScore.cpp

// These functions are mine not apart of original ManiaScore.cpp
// Most are used to assume data that would be provided by the client
(function(){Math.clamp=function(a,b,c){return Math.max(b,Math.min(c,a));}})();

function computeDifficultyMultiplier(CS, HP, OD) {
  return parseInt(CS) + parseInt(HP) + parseInt(OD)
}

function computeTotalScore (objects, CS, HP, OD) {
  let MaxScore = 1000000
  let ModMultiplier = 1
  let score = 0
  for (let i = 0; i < objects; i++ ) {
    let BaseScore = (MaxScore * ModMultiplier * 0.5 / objects) * (300 / 320)
    let BonusScore = (MaxScore * ModMultiplier * 0.5 / objects) * (32 * Math.sqrt(100) / 320)
    score += BaseScore + BonusScore
  }
  console.log(`Score:`, score)
  return score
  // return ((Math.ceil(objects*0.02) * 50) + (Math.ceil(objects*0.03) * 100)  + (Math.ceil(objects*0.94) * 300)) * objects
}

function computeHitWin300 (OD) {
  return 64 - (OD * 3) + 0.5
}

function calculateDifficulty(objects) {
  let maximumStrain = 0;
  let timerate = 0
  let intervalEndTime = 400 * timerate

  for (let i = 0; i < objects.length; i++) {

    if (objects[i-1]['startTime'] == null) {
      maximumStrain = 0;
    } else {
      let individualDecay = Math.pow(0.125, (intervalEndTime - objects[i-1]['startTime']) / 1000)
      let overallDecay = Math.pow(0.30, (intervalEndTime - objects[i-1]['startTime']) / 1000);
      // maximumStrain = previousHitObject.IndividualStrain * individualDecay + previousHitObject.OverallStrain * overallDecay;
    }
    maximumStrain = Math.max(/*strain*/, maximumStrain);
    let difficulty = 0;
    let weight = 1;
    // highestStrains.Sort((a, b) => b.CompareTo(a)); // Wait wtf its an array

    for (strain in highestStrains)
    {
      difficulty += weight * strain;
      weight *= decay_weight;
    }
  }



  }

  return difficulty * 0.018
}

function computeTotalValue (strainValue, accValue) {
  console.log(`strainValue`, strainValue)
  console.log(`accValue`, accValue)
  return Math.pow(
    Math.pow(strainValue , 1.1) +
    Math.pow(accValue, 1.1), 1.0 / 1.1
  ) * 0.8
}

function computeStrainValue (objects, CS, HP, OD) {
  let score = computeTotalScore(objects, CS, HP, OD)
  score *= 1 // Score Multiplier, I think its just a mods thing
  let strainValue = Math.pow(5.0 * Math.max(1.0, 4.13 / 0.2) - 4.0, 2.2) / 135.0;
  strainValue *= 1 + 0.1 * Math.min(1.0, objects / 1500.0);
  if (score <= 500000) {
    strainValue = 0;
  } else if (score <= 600000) {
    strainValue *= (score - 500000) / 100000.0 * 0.3;
  } else if (score <= 700000) {
    strainValue *= 0.30 + (score - 600000) / 100000
  } else if (score <= 800000) {
    strainValue *= 0.65 + (score - 700000) / 100000
  } else if (score <= 900000) {
    strainValue *= 0.85 + (score - 800000) / 100000
  } else {
    strainValue *= 0.95 + (score - 900000) / 100000
  }
  return strainValue
}

function computeAccValue (objects, CS, HP, OD) {
  let strainValue = computeStrainValue(objects, CS, HP, OD)
  let hitWin300 = computeHitWin300(OD)
  let score = computeTotalScore(objects, CS, HP, OD)
  return Math.max(0.0, 0.2 - ((hitWin300 - 34) * 0.006667)) * strainValue * Math.pow((Math.max(0.0, (score - 960000)) / 40000.0), 1.1)
}

function tests () {
  parser.parseFile(path.join('.', 'temp', 'insane.osu'), async function (err, data) {
    let objects = data['hitObjects'].length
    console.log(objects)
    let CS = parseInt(data['CircleSize'])
    let HP = parseInt(data['HPDrainRate'])
    let OD = parseInt(data['OverallDifficulty'])
    let StrainValue = computeStrainValue(objects, CS, HP, OD)
    let Acc = computeAccValue(objects, CS, HP, OD)
    console.log(`100% PP:`, await computeTotalValue(StrainValue, Acc))
  })
}

tests()
