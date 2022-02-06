/* Uses Control component of type Select */

import Chevron from "./Chevron.svg";

const backgroundImage = { backgroundImage: `url(${Chevron})` };
control = (
  <select
    ref={focusRef}
    style={backgroundImage}
    className={styles["select"]}
    {...attributes}
    defaultValue={selected}
  >
    {options.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    ))}
  </select>
);
