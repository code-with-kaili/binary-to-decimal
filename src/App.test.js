import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App Component', () => {
  test('should enter up to 8 characters in a single input', () => {
    const { getByLabelText } = render(<App />);
    const binaryInput = getByLabelText('Binary');
    let smallValue, sameValue, longValue;

    userEvent.clear(binaryInput);
    userEvent.type(binaryInput, '01');
    smallValue = binaryInput.value;
    
    userEvent.clear(binaryInput);
    userEvent.type(binaryInput, '01100111');
    sameValue = binaryInput.value;
    
    userEvent.clear(binaryInput);
    userEvent.type(binaryInput, '011001110');
    longValue = binaryInput.value;

    expect(smallValue).toBe('01');
    expect(sameValue).toBe('01100111');
    expect(longValue).toBe('01100111');

  })

  test('should notify when character is not 0 or 1.', () => {
    const { getByLabelText } = render(<App />);
    const binaryInput = getByLabelText('Binary');
    
    userEvent.clear(binaryInput);
    userEvent.type(binaryInput, 'abc');

    expect(binaryInput.value).toBe('');
    expect(getByLabelText('Error Message')).toHaveTextContent('Only 0x and 1s allowed.');
    
  })

  test('should display a decimal number', () => {
    const { getByLabelText } = render(<App />);
    const binaryInput = getByLabelText('Binary');
    
    userEvent.clear(binaryInput);
    userEvent.type(binaryInput, '01100111');

    expect(getByLabelText('Decimal')).toHaveTextContent('103');

  })
  
})
