import styled from 'styled-components'

export const StyledBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 130px 0 100px;
  height: 100vh
`

export const StyledCenteredBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0 10px 15px;
  margin-bottom: 50px;

  .header {
    color: #403e3e;
    font-weight: lighter;
    margin: 0 0 30px 0;
  }
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
  color: white;
  background-color: #f7c288;
  font-size: 17px;
  padding: 5px 20px;
  :hover {
    color: #f7c288;
    background-color: white;
    cursor: pointer;
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
  margin: 20px 0;
  width: 100%;

  * {
    margin 0 10px 0 0;
  }
`

export const StyledFormInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px;
  width: 400px;
  font-size: 15px;

  label {
    width: 150px;
    height: 20px;
    line-height: 20px;
    padding: 5px 5px;
    font-size: 17px;
  }
`

export const StyledInput = styled.input`
  border: 2pt solid #f7c288;
  border-radius: 5px;
  background-color: white;
  font-size: 15px;
  padding: 5px 5px;
  height: 30px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`

export const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1pt solid #f7c288;
  background: #f7c288;
  color: white;
  border-radius: 5px;
  padding: 30px 100px;
  margin: 10px 10px;

  .header {
    margin: 0 0 30px 0;
    font-weight: normal;
    letter-spacing: 1px;
    display: flex;
    justify-content: center;
  }

  .submit {
    margin: 10px 0 0 0;
    letter-spacing: 1px;
  }
`

export const StyledSelect = styled.select`
  border: 2pt solid #f7c288;
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
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 60px;
  background: #403e3e;
  box-shadow: 1px 0 2px rgba(0,0,0,0.125);
  display: flex;
  align-items: center;

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
      background-color: #403e3e;
      color: white;
      border: none;
      font-size: 20px;
      text-transform: uppercase;
      cursor: pointer;
    }
  }
`