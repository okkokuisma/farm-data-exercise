import styled from 'styled-components'

export const StatTable = styled.table`
  table-layout: fixed;
  width: 1200px;
  border-collapse: collapse;
`

export const TableCell = styled.td`
  padding: 10px;
  letter-spacing: 1px;
  text-align: center;
`

export const TableHead = styled.thead`
  border-bottom: 1pt solid black;
`

export const Table = styled.div`
  .table {
    display: inline-block;
    border-spacing: 0;
    width: 1200px;
    .thead {
      border-bottom: 1pt solid black;
    }
    .th,
    .td {
      padding: 10px;
      letter-spacing: 1px;
      text-align: center;
    }
  }
`

export const ListItem = styled.div`
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

export const Field = styled.input`
  border: 2pt solid white;
  border-radius: 5px;
  background-color: white;
  font-size: 15px;
  padding: 5px 5px;
`

export const Button = styled.button`
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
`

export const Select = styled.select`
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

export const ToggleButton = styled(Button)`
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

export const FormInput = styled.div`
  display: flex;
  justify-content: space-between;
  width: 30%;
  align-items: center;
  margin: 10px;
`

export const StyledNotification = styled.div`
  * {
    position: fixed;
    right: 30px;
    width: 30%;
    height: 60px;
    color: white;
    text-align: center;
    font-size: 20px;
    padding: 0;
    letter-spacing: 2px;
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

// export const NavBar = styled.ul`
//   position: fixed;
//   list-style-type: none;
//   left: 0;
//   top: 0;
//   margin: 0;
//   padding: 0;
//   width: 10%;
//   height: 100%;
//   background: #323233;
//   // box-shadow: 1px 0 2px rgba(0,0,0,0.125);

//   .links * {
//     display: block;
//     text-decoration: none;
//     font-size: 20px;
//     color: white;
//     letter-spacing: 2px;
//     text-transform: uppercase;
//     padding: 8px 20px;
//   }
// `
export const NavBar = styled.div`
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

  .links a {
    font-size: 20px;
    color: white;
    letter-spacing: 2px;
    text-transform: uppercase;
    padding: 0 20px;
    flex: 1;
  }
`