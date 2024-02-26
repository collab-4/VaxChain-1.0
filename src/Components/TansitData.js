import React ,{ useState } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead, MDBBtn } from 'mdb-react-ui-kit';
import SearchBar from './SearchPage';
const TransitData = () => {
    const [data, setData] = useState([
    { id: 'TN101', currentLocation: 'Delhi', nextLocation: 'Mumbai', status: 'In transit' },
    { id: 'TN398', currentLocation: 'Bangalore', nextLocation: 'Chennai', status: 'In transit' },
    { id: 'TN309', currentLocation: 'Kolkata', nextLocation: 'Hyderabad', status: 'In transit' },
    { id: 'TN207', currentLocation: 'Ahmedabad', nextLocation: 'Pune', status: 'In transit' },
    { id: 'TN508', currentLocation: 'Jaipur', nextLocation: 'Lucknow', status: 'In transit' },
    { id: 'TN713', currentLocation: 'Surat', nextLocation: 'Nagpur', status: 'In transit' },
    { id: 'TN615', currentLocation: 'Visakhapatnam', nextLocation: 'Indore', status: 'In transit' },
    { id: 'TN827', currentLocation: 'Thane', nextLocation: 'Patna', status: 'In transit' },
    { id: 'TN934', currentLocation: 'Ludhiana', nextLocation: 'Agra', status: 'In transit' },
    { id: 'TN125', currentLocation: 'Varanasi', nextLocation: 'Allahabad', status: 'In transit' },
    // Add more data here...
    ]);

    const handleReceive = (id) => {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, status: 'Received' } : item
          )
        );
      };

      return (
        <div >
          <SearchBar/>
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th>Transit ID</th>
                <th>Current Location</th>
                <th>Next Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {data.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.currentLocation}</td>
                  <td>{item.nextLocation}</td>
                  <td>{item.status}</td>
                  <td>
                    {item.status === 'In transit' ? (
                      <MDBBtn
                        className="btn-secondary"
                        style={{ backgroundColor: 'var(--secondary-color)', borderColor: 'var(--secondary-color)',color:'var(--primary-color' }}
                        onClick={() => handleReceive(item.id)}
                      >
                        Receive
                      </MDBBtn>
                    ) : (
                      <MDBBtn
                        className="btn-outline-secondary"
                        style={{ borderColor: 'var(--secondary-color)', color: 'var(--secondary-color)' }}
                      >
                        Received
                      </MDBBtn>
                    )}
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      );
    }
    
    export default TransitData;