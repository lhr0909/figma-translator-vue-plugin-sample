import { Selector } from "./components/Selector";
import { Switcher } from "./components/Switcher";
import { TranslateButton } from "./components/TranslateButton";

export function App() {
  return (
    <div className="flex flex-col items-center w-full h-full p-4 gap-2">
      <Selector label="From" />
      <Switcher />
      <Selector label="To" />
      <TranslateButton />
    </div>
  );
}
