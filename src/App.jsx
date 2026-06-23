import Form1 from "./components/Form1";
import Form2 from "./components/Form2";

export default function App() {
  return (
    <div className="container mx-auto flex flex-col lg:flex-row gap-10 justify-center ">
      <Form1 />
      <Form2 />
    </div>
  );
}
