import { showModal } from "./modal";
import { createElement } from "../../helpers/domHelper";

export function showWinnerModal(fighter) {
  // call showModal function 
  const title = `And the winner is... ${fighter.name}!!!`;
  const bodyElement = createElement('h1', 'modal-title');
  bodyElement.innerText = 'WE GOT A NEW CHAMPION!🎆';
  const onClose = () => window.location.reload();
  showModal({ title, bodyElement, onClose });
}