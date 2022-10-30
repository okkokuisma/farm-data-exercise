import styled from 'styled-components'

export const StyledBodyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 100px 10% 0 10%;
  height: 100vh;
`
export const StyledDivContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
  width: 100%;

  .header {
    margin: 0 0 30px 0;
    color: #403e3e;
    font-weight: lighter;

    * {
      color: #403e3e;
      font-weight: lighter;
    }
  }
`

export const StyledChart = styled.div`
  width: 800px;
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

  a {
    color: black;
    text-decoration: none;
    :hover {
      text-decoration: underline;
    }
  }
`

export const StyledTableHead = styled.thead`
  border-bottom: 1pt solid black;

  th {
    :hover {
      cursor: pointer;
    }
  }
`

export const StyledList = styled.ul`
  width: 500px;
  padding: 0;
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
  width: 320px;
  font-size: 15px;

  label {
    // width: 150px;
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
  border: 5px solid #f7c288;
  background: #f7c288;
  color: white;
  border-radius: 5px;
  padding: 35px;
  width: 320px;
  position: relative;
  left: 200px;
`

export const StyledFormDiv = styled.div`
  position: relative;
  width: 800px;
  margin-bottom: 30px;

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
  // padding: 5px 5px;
  height: 30px;

  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
`

export const StyledFormErrorDiv = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 620px;
  top: 0;
`
export const StyledFormError = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 5px solid #f56767;
  background: #f56767;
  color: white;
  font-size: 15px;
  width: 200px;
  border-radius: 5px;
  margin-bottom: 10px;
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