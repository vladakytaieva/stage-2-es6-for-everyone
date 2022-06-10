import { createElement } from '../helpers/domHelper';

export function createFighterPreview(fighter, position) {
  const positionClassName = position === 'right' ? 'fighter-preview___right' : 'fighter-preview___left';
  const fighterElement = createElement({
    tagName: 'div',
    className: `fighter-preview___root ${positionClassName}`,
  });
  // todo: show fighter info (image, name, health, etc.)
  const imageElement = createFighterImage(fighter);
  fighterElement.append(imageElement);
  const fighterInfo = createElement({
    tagName: 'div',
    className: 'fighter-preview___info'
  });
  fighterInfo.innerHTML = `
    <h1>${fighter.name}</h1>
    <p>Health: ${fighter.health}</p>
    <p>Defense: ${fighter.defense}</p>
    <p>Attack: ${fighter.attack}</p>
  `;
  fighterElement.appendChild(fighterInfo);
  return fighterElement;
}

export function createFighterImage(fighter) {
  const { source, name } = fighter;
  const attributes = { 
    src: source, 
    title: name,
    alt: name 
  };
  const imgElement = createElement({
    tagName: 'img',
    className: 'fighter-preview___img',
    attributes,
  });

  return imgElement;
}
