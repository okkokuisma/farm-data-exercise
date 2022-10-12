import styled from 'styled-components'

export const StyledBodyDiv = styled.div`
  padding: 100px 100px 0 100px;
  height: 100%
`

export const StyledCenteredBodyDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50vh;
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

export const StyledDivContainer = styled.div`
  border-left: 5pt solid sandybrown;
  padding: 0 0 10px 15px;
  margin-bottom: 50px;
`

export const StyledListItem = styled.li`
  display: flex;
  align-items: center;
  letter-spacing: 1px;
  font-size: 20px;
  justify-content: space-between;

  a {
    color: black;
    text-decoration: none;
  }

  // .pushedRight {
  //   border: none;
  //   margin-left: auto;
  //   height: 100%;
  //   font-size: 20px;
  //   :hover {
  //     background-color: sandybrown;
  //   }
  }
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

export const StyledToggleButton = styled(StyledButton)`
  width: 30%;
  font-size: 20px;
  text-align: left;
  padding: 7px 7px;
`

export const Filters = styled.div`
  display: flex;
  align-items: center;
  // justify-content: space-evenly;
  margin: 10px 0;

  * {
    margin 0 10px 0 0;
  }
`

export const StyledFormInput = styled.div`
  display: flex;
  align-items: center;
  margin: 10px;
  width: 400px;

  label {
    width: 150px;
    height: 20px;
    line-height: 20px;
    padding: 5px 5px;
    font-size: 15px;
  }
`

export const StyledInput = styled.input`
  border: 1pt solid black;
  border-radius: 5px;
  background-color: white;
  font-size: 15px;
  padding: 5px 5px;
  height: 30px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`

export const StyledSelect = styled.select`
  border: 1pt solid black;
  border-radius: 5px;
  font-size: 15px;
  padding: 5px 5px;
  height: 30px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`

export const StyledFormError = styled.div`
  margin: 0 10px;
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