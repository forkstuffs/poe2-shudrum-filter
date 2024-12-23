import { Section } from '../entities/filter/index.js';
import { Card } from '../entities/generators/index.js';
import { global, modes } from '../configuration/index.js';

export default ({ modeId }) => {
  const section = Section('Gold');

  const common = {
    class: 'Currency',
    type: 'Gold',
  };

  section.addBlock({
    ...common,
    areaLevel: `< ${global.startingAreaLevel}`,
    card: Card(Card.SIZES.SMALL, Card.THEMES.GOLD),
  });

  section.addBlock({
    ...common,
    areaLevel: `>= ${global.startingAreaLevel}`,
    stackSize: `< ${modes.GoldMinimumDisplayedAmount[modeId]}`,
    card: Card(Card.SIZES.VALUE_15, Card.THEMES.GOLD),
  });

  function generateValues(from, to) {
    const steps = 6;
    const stepSize = (to - from) / (steps - 1);
    return Array.from({ length: steps }, (_, i) => Math.round(from + i * stepSize));
  }

  generateValues(
    modes.GoldMinimumDisplayedAmount[modeId],
    modes.GoldCeilingDisplaySizeAmount[modeId],
  ).forEach((stackSize, i) => {
    section.addBlock({
      ...common,
      areaLevel: `>= ${global.startingAreaLevel}`,
      stackSize: `>= ${stackSize}`,
      ...i === 5
        ? { card: Card(20 + i * 5, Card.THEMES.GOLD) }
        : { card: Card(20 + i * 5, Card.THEMES.GOLD, Card.TYPES.OUTLINE) },
    });
  });

  return section;
};
