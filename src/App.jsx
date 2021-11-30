import { useEffect, useState } from 'react';
import { Alert, Col, Container, FormControl, InputGroup, Row } from 'react-bootstrap';
import './App.css';

function App() {
  const [binary, setBinary] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [decimal, setDecimal] = useState('');

  const handleChangeBinary = (e) => {
    const newBin = e.target.value;
    const binRegex  = /\b[01]+\b/

    if (newBin.length <= 8) {
      if (newBin === '' || binRegex.test(newBin)) {
        setBinary(newBin);
        setErrorMessage('');
      } else {
        setErrorMessage('Only 0x and 1s allowed.');
      }
    }
  }

  useEffect(() => {
    if (binary === '') setDecimal('');
    else {
      let newDec = 0;
      for (let i = 0; i < binary.length; i++) {
        if (binary[i] === '1') {
          newDec += Math.pow(2, binary.length - (i + 1));
        }
      }

      setDecimal(newDec);
    }
  }, [binary])

  return (
    <Container className='my-5'>
      <h1 className='display-1 text-center mb-5'>Binary to Decimal Converter</h1>
      <Row>
        <Col>
          <p className="display-6 text-end">Binary</p>
        </Col>
        <Col>
          <p className="display-6">Decimal</p>
        </Col>
      </Row>
      <InputGroup size="lg">
        <FormControl 
          type='text' 
          aria-label='Binary' 
          value={binary} 
          onChange={handleChangeBinary}
          className='text-end'
        />
        <InputGroup.Text 
          aria-label='Decimal'
          style={{ width: '50%' }}
        >
          {decimal}
        </InputGroup.Text>
        
      </InputGroup>
      {errorMessage && <Alert variant='danger' className='text-center my-4' aria-label='Error Message'>{errorMessage}</Alert>}
      
    </Container>
  );
}

export default App;
