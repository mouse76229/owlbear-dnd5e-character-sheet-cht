import { findAny } from "../compendium";
import type { Gear } from "../types";

export function weightForGear(g: Gear): number {
  const foundGear = findAny(g.name);
  if (!foundGear) {
    console.log("Cannot find gear: " + g.name);
    return 0;
  }
  return (foundGear.weight || 0) * g.quantity;
}
