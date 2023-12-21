'use client'

import * as Select from '@radix-ui/react-select';
import styles from './styles/customDropdown.module.scss'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import { useEffect, useRef, useState } from 'react';


type CustomDropdownProps = {
  list: string[]
  placeholder?: string
  selectIconColor?: string
  defaultValue?: string
  defaultWidth?: string
  onSelect: (value: string) => void;
}


const CustomDropdown = ({ list, placeholder, selectIconColor, defaultValue, defaultWidth, onSelect }: CustomDropdownProps) => {

  const [value, setValue] = useState(defaultValue ? defaultValue : '')

  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [maxWidth, setMaxWidth] = useState<number | string | null>(defaultWidth === 'auto' ? 'var(--radix-select-item-width)' : null)

  const handleValueChange = (newValue: string) => {
    setValue(newValue);
    onSelect(newValue); // Call the onSelect callback with the selected value
  };

  useEffect(() => {
    if (triggerRef.current && itemRef.current) {
      const triggerWidth = triggerRef.current.offsetWidth;
      const itemWidth = itemRef.current.offsetWidth;
      setMaxWidth(Math.max(triggerWidth, itemWidth));
    }
  }, []);


  return (
    <section className={styles.dropdownComponent}
      style={{
        border: 'none',
        margin: '0',
        padding: '0',
        height: '100%'
      }}>
      <Select.Root value={value} onValueChange={handleValueChange}>
        <Select.Trigger className={styles.SelectTrigger} ref={triggerRef}
          style={{
            border: 'none',
            margin: '0',
            padding: '0',
            background: 'inherit',
            height: '90%',
            borderRadius: '0px',
            color: 'inherit'
          }}

        >
          <Select.Value placeholder={placeholder} aria-label={value}>
            {value === '' ? placeholder : value}
          </Select.Value>
          <Select.Icon className={styles.SelectIcon} style={{ color: `${selectIconColor ? selectIconColor : '#000'}` }}>
            <ChevronDownIcon />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className={styles.SelectContent} position="popper" sideOffset={0}>
            <Select.Viewport className={styles.SelectViewport}
              style={{
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '5px',
                boxShadow: '0px 28px 66px 0px rgba(0, 0, 0, 0.2)',
                maxHeight: '150px',
                overflow: 'auto',
                minWidth: `${maxWidth !== null ? maxWidth + 'px' : 'var(--radix-select-trigger-width)'}`,
              }}
            >
              {list.map((item, index) => (
                <Select.Item value={item} key={index} ref={itemRef}
                  className={styles.SelectItem}
                  style={{
                    fontSize: '14px',
                    color: '#828282',
                    fontFamily: 'var(--font-rubik)',
                    fontWeight: '300',
                    lineHeight: '160%',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <Select.ItemText className={styles.SelectItemText} >{item}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </section>
  );
}

export default CustomDropdown;