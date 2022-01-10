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

export const List = styled.ul`
  list-style-type: none;
  padding: 0;

  .farm button {
    width: 80%;
    border: none;
    text-align: center;
    text-decoration: none;
    font-size: 20px;
    padding: 15px 5px;
    :hover {
      background-color: sandybrown;
    }
  }
`

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