import { controls } from '../../constants/controls';

export async function fight(firstFighter, secondFighter) {
  const indicator1 = document.querySelector('#left-fighter-indicator');
  const indicator2 = document.querySelector('#right-fighter-indicator');
  let currentHealth1 = firstFighter.health;
  let currentHealth2 = secondFighter.health;
  return new Promise((resolve) => {
    // resolve the promise with the winner when fight is over
    let isBlocking1 = false;
    let isBlocking2 = false;

    let pressedKeys1 = [];
    let pressedKeys2 = [];

    document.addEventListener('keydown', ev => {
      if(!ev.repeat) {
        switch(ev.code) {
          case controls.PlayerOneAttack:
            if (!isBlocking1 && !isBlocking2) {
              let damage = getDamage(firstFighter, secondFighter);
              currentHealth2 -= damage;
              indicator2.style.width = `${currentHealth2 * 100 / secondFighter.health}%`;
            }
            break;
          case controls.PlayerTwoAttack:
            if (!isBlocking1 && !isBlocking2) {
              let damage = getDamage(secondFighter, firstFighter);
              currentHealth1 -= damage;
              indicator1.style.width = `${currentHealth1 * 100 / firstFighter.health}%`;
            }
            break;
          case controls.PlayerOneBlock:
            isBlocking1 = true;
            break;
          case controls.PlayerTwoBlock:
            isBlocking2 = true;
            break;
          default:
            break;
        }

        if (controls.PlayerOneCriticalHitCombination.includes(ev.code)) {
          if (!pressedKeys1.includes(ev.code)) {
            pressedKeys1.push(ev.code)
          }
          if (pressedKeys1.length === 3) {
            let damage = 2 * firstFighter.attack;
            currentHealth2 -= damage;
            indicator2.style.width = `${currentHealth2 * 100 / secondFighter.health}%`;
          }
        } else if (controls.PlayerTwoCriticalHitCombination.includes(ev.code)) {
          if (!pressedKeys2.includes(ev.code)) {
            pressedKeys2.push(ev.code)
          }
          if (pressedKeys2.length === 3) {
            let damage = 2 * secondFighter.attack;
            currentHealth1 -= damage;
            indicator1.style.width = `${currentHealth1 * 100 / firstFighter.health}%`;
          }
        }

        if (currentHealth1 <= 0) {
          resolve(secondFighter);
        } else if (currentHealth2 <= 0) {
          resolve(firstFighter);
        }
      }

    })

    document.addEventListener('keyup', ev => {
      switch(ev.code) {
        case controls.PlayerOneBlock:
          isBlocking1 = false;
          break;
        case controls.PlayerTwoBlock:
          isBlocking2 = false;
          break;
        default:
          break;
      }

      if (controls.PlayerOneCriticalHitCombination.includes(ev.code)) {
        if (pressedKeys1.includes(ev.code)) {
          pressedKeys1.splice(pressedKeys1.indexOf(ev.code), 1)
        }
      } else if (controls.PlayerTwoCriticalHitCombination.includes(ev.code)) {
        if (pressedKeys2.includes(ev.code)) {
          pressedKeys2.splice(pressedKeys2.indexOf(ev.code), 1)
        }
      }
    })

  });
}

export function getDamage(attacker, defender) {
  // return damage
  const hit = getHitPower(attacker);
  const block = getBlockPower(defender);
  const result = hit - block;
  return result >= 0 ? result : 0
}

export function getHitPower(fighter) {
  // return hit power
  const {attack} = fighter;
  const criticalHitChance = Math.random() + 1;
  const power = attack * criticalHitChance;
  return power;
}

export function getBlockPower(fighter) {
  // return block power
  const {defense} = fighter;
  const dodgeChance = Math.random() + 1;
  const power = defense * dodgeChance;
  return power;
}
