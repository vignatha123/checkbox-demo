import React, { useState, useRef, useEffect } from "react";

const data = {
  label: "Select All",
  children: [
    {
      label: "Fruits",
      children: [
        { label: "Apple" },
        { label: "Banana" },
        { label: "Orange" }
      ]
    },
    {
      label: "Vegetables",
      children: [
        { label: "Carrot" },
        { label: "Tomato" },
        { label: "Potato" }
      ]
    }
  ]
};

// collect only leaf labels (no children)
function collectLeafLabels(node) {
  if (!node.children || node.children.length === 0) return [node.label];
  return node.children.flatMap(child => collectLeafLabels(child));
}

function NestedCheckbox({ node, checkedLeaves, setCheckedLeaves }) {
  const checkboxRef = useRef(null);
  const leafLabels = collectLeafLabels(node);

  const checkedCount = leafLabels.filter(l => checkedLeaves.includes(l)).length;
  const isChecked = checkedCount === leafLabels.length && leafLabels.length > 0;
  const isIndeterminate = checkedCount > 0 && checkedCount < leafLabels.length;

  useEffect(() => {
    if (checkboxRef.current) checkboxRef.current.indeterminate = isIndeterminate;
  }, [isIndeterminate]);

  const handleChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setCheckedLeaves(prev => Array.from(new Set([...prev, ...leafLabels])));
    } else {
      setCheckedLeaves(prev => prev.filter(l => !leafLabels.includes(l)));
    }
  };

  return (
    <div style={{ marginLeft: 16 }}>
      <label>
        <input
          ref={checkboxRef}
          type="checkbox"
          checked={isChecked}
          onChange={handleChange}
        />{" "}
        {node.label}
      </label>

      {node.children &&
        node.children.map((child, idx) => (
          <NestedCheckbox
            key={idx}
            node={child}
            checkedLeaves={checkedLeaves}
            setCheckedLeaves={setCheckedLeaves}
          />
        ))}
    </div>
  );
}

export default function CheckboxTree() {
  const [checkedLeaves, setCheckedLeaves] = useState([]);
  return (
    <div>
      <NestedCheckbox node={data} checkedLeaves={checkedLeaves} setCheckedLeaves={setCheckedLeaves} />

      <div style={{ marginTop: 18 }}>
        <h3>Selected leaf items (state):</h3>
        <pre>{JSON.stringify(checkedLeaves, null, 2)}</pre>
      </div>
    </div>
  );
}
