import { useState } from 'react';
const Rate = ({callback}: Record<'callback', (value: number) => Promise<void>>) => {
  const [value, setValue] = useState(5);

  const updateValue = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const num = parseInt(e.currentTarget.value);
    if (num) setValue(num);
  }

  return (
    <div>
      <input
        type='range'
        min='1'
        max='10'
        value={value}
        onChange={updateValue}
      />
      {value}
      <p>
        <button onClick={() => callback(value)}>Rate</button>
      </p>
    </div>
  )
}

export default Rate;
