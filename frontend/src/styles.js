import styled from 'styled-components'

export const StyledBodyDiv = styled.div`
  margin: 100px 5%;
`

export const StyledTable = styled.table`
  table-layout: fixed;
  width: 100%;
  border-collapse: collapse;
`

export const StyledTableCell = styled.td`
  padding: 10px;
  letter-spacing: 1px;
  text-align: center;
  :focus-within {
    .th {
      text-decoration: underline;
    }
  }
`

export const StyledTableHead = styled.thead`
  border-bottom: 1pt solid black;
`

export const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  font-size: 20px;
  :hover {
    .itemName {
      text-decoration: underline sandybrown;
    }
  }

  .pushedRight {
    border: none;
    margin-left: auto;
    height: 100%;
    font-size: 20px;
    :hover {
      background-color: sandybrown;
    }
  }
`

export const StyledInput = styled.input`
  border: 2pt solid white;
  border-radius: 5px;
  background-color: white;
  font-size: 15px;
  padding: 5px 5px;
`

export const StyledButton = styled.button`
  border: 2pt solid white;
  border-radius: 5px;
  color: sandybrown;
  background-color: white;
  font-size: 17px;
  padding: 5px 20px;
  :hover {
    color: white;
    background-color: sandybrown;
  }
  :disabled {
    :hover {
      background-color: grey;
      color: white;
      cursor: not-allowed;
    }
  }
`

export const StyledSelect = styled.select`
  width: 200px;
  border: 2pt solid white;
  border-radius: 5px;
  // text-align: center;
  text-decoration: none;
  font-size: 15px;
  padding: 5px 0px;
  :hover {
    background-color: sandybrown;
  }
`

export const StyledToggleButton = styled(StyledButton)`
  width: 30%;
  font-size: 20px;
  text-align: left;
  padding: 7px 7px;
`

export const Filters = styled.div`
  display: flex;
  align-items: center;
  * {
    padding: 5px 5px;
  }
`

export const StyledFormInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;
  margin: 10px;
`

export const StyledFormError = styled.div`
  color: red;
`

export const StyledNotification = styled.div`
  position: fixed;
  margin : 60px 0;
  top: 0;
  left: 0;
  width: 100%;

  * {
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    font-size: 20px;
    letter-spacing: 2px;
    height: 40px;
  }

  .success {
    background-color: #70CA69;
  }

  .error {
    background-color: #EA5136;
  }

  .info {
    background-color: #EEE559;
  }
`
export const StyledNavBar = styled.div`
  font-family: Arial;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background: #323233;
  box-shadow: 1px 0 2px rgba(0,0,0,0.125);
  display: flex;
  align-items: center;

  .logo {
    width: 250px;
    font-size: 25px;
    font-weight: 700;
    padding: 0 20px;
    color: white;
    letter-spacing: 2px;
    text-transform: uppercase;
    border-right: 1px solid #f5f5f5;
  }

  .links {
    * {
      padding: 0 20px;
    }

    a {
      font-size: 20px;
      color: white;
      letter-spacing: 2px;
      text-transform: uppercase;
      flex: 1;
      text-decoration: none;
    }

    button {
      background-color: #323233;
      color: white;
      border: none;
      font-size: 20px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
`