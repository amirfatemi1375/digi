import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

export default ({items,label}) => {
  const ref = useRef();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedItem,setSelectedItem]=useState("");
  useEffect(() => {
    const checkIfClickedOutside = e => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (isMenuOpen && ref.current && !ref.current.contains(e.target)) {
        setIsMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", checkIfClickedOutside)
    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside)
    }
  }, [isMenuOpen])
  const handleClick = () => {
    setIsMenuOpen(true)
  };
  const selectItem = (item) => {
    setIsMenuOpen(false);
    setSelectedItem(item[label])
  };

  return (
    <>
      <div className="drop-down">
        <div
          className={`input size text color ${isMenuOpen && "active"}`}
          onClick={() => handleClick()}
        >
         {selectedItem?selectedItem:"یک مورد را انتخاب کنید"}
        </div>
        <div className="list size color" ref={ref}>
        {isMenuOpen && items.map((item)=>(
             <div className="item size text" onClick={() => selectItem(item)} >
                  {item[label]}
             </div>
        ))}
        </div>
        </div>
         
           
    </>
  );
};
