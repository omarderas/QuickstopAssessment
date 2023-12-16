import React, { useState, useEffect } from "react"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { Container, Button, Col } from "react-bootstrap"
import "../components/main.scss"

const IndexPage = () => {
  const [employers, setEmployers] = useState([])
  const [filteredEmployers, setFilteredEmployers] = useState([])
  const [jobTitles, setJobTitles] = useState([])
  const [filteredJobTitles, setFilteredJobTitles] = useState([])
  const [activeLetter, setActiveLetter] = useState('');

  useEffect(() => {
    // Fetch data from the endpoint
    fetch("https://auto-pay-api-sgiognjnfa-uc.a.run.app/auto-pay/get-ui-params")
      .then(response => response.json())
      .then(data => {
        if (data && data.employers && data.jobTitles) {
          setEmployers(data.employers)
          setFilteredEmployers(data.employers)
          setJobTitles(data.jobTitles)
          setFilteredJobTitles(data.jobTitles)
        }
      })
      .catch(error => console.error("Error fetching data:", error))
  }, [])

  const handleEmployerSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()
    const filtered = employers.filter(employer => employer.item.toLowerCase().includes(searchValue) || String(employer.id).includes(searchValue))
    setFilteredEmployers(filtered)
  }

  const handleJobTitleSearch = (e) => {
    const searchValue = e.target.value.toLowerCase()
    const filtered = jobTitles.filter(jobTitle => jobTitle.item.toLowerCase().includes(searchValue) || String(jobTitle.id).includes(searchValue))
    setFilteredJobTitles(filtered)
  }

  const paginateEmployers = (letter) => {
    let startingWithLetter = employers.filter(employer =>
      employer.item.toLowerCase().startsWith(letter.toLowerCase()) && !/^\d/.test(employer.item)
    );

    let startingWithNumber = [];

    if (letter === '0-9') {
      startingWithNumber = employers.filter(employer =>
        /^\d/.test(employer.item)
      );
    }

    if (letter === 'all') {
      setFilteredEmployers(employers);
    } else {
      setFilteredEmployers([...startingWithLetter, ...startingWithNumber]);
      setActiveLetter(letter);
    }

 
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];
  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = months[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  return (
    <Layout>
      <Seo title="Home" />
      <div className="main-home">
        <Container>
          <div className="header">
             <div className="row">
                <div className="col-sm-6">
                  <h2>Welcome to Quickstop Assessment.</h2>
                  <p>Relax, take your time, YOU GOT THIS!</p>
                </div>
                <div className="col-sm-6 date">
                  <h2>{currentDay} {currentMonth} {currentYear}</h2>
                </div>
             </div>
          </div>
          <div className="row">
            <div className="col-sm-6">
                <div class="featured-content">
                <table>
                  <thead>
                    <div className="table-header"> 
                        
                        <h2>Employers</h2>
                        <input type="text" placeholder="Search by ID or Employer Name" onChange={handleEmployerSearch} />
                    </div>
                    <tr>
                      <th>ID</th>
                      <th>Employer Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEmployers.map(employer => (
                      <tr key={employer.id}>
                        <td>{employer.id}</td>
                        <td>{employer.item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="pagination">
              
                  {Array.from({ length: 26 }, (_, index) => String.fromCharCode(65 + index)).map(letter => (
                    <button
                      key={letter}
                      onClick={() => paginateEmployers(letter)}
                      className={activeLetter === letter ? 'active' : ''}
                    >
                      {letter}
                    </button>
                    
                  ))}
                  <button
                    onClick={() => paginateEmployers("0-9")}
                    className={activeLetter === '0-9' ? 'active' : ''}
                  >
                    0-9
                  </button>
                  <button onClick={() => paginateEmployers("all")}>All</button>
                </div>
              </div>
            
            </div>
            <div className="col-sm-6">
              <div class="featured-content">
              
                <table>
                  <thead>
                  <div className="table-header"><h2>Job Titles</h2>
                  <input type="text" placeholder="Search by ID or Job Title" onChange={handleJobTitleSearch} />
                  </div>
                    <tr>
                      <th>ID</th>
                      <th>Job Title</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredJobTitles.map(jobTitle => (
                      <tr key={jobTitle.id}>
                        <td>{jobTitle.id}</td>
                        <td>{jobTitle.item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
          <div className="row questions">
            <div className="col-sm-12">
              <div className="questions-cont">
                 <h2>What’s the difference between const and var in JavaScript?</h2>
                 <p>const and var are used for variable declarations in javascript. Variables declared as const must remain as constants through the entire
                  function/program. This means that their value cannot change after it has been initialized, and they must be initialized with a value when they are declared.
                  These variables can only be accessed within the scope they have been declared in, and when used to declare an array or object, the content within the 
                  arrays or object can be updated.
                 </p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="questions-cont">
                <h2>Difference between inner join and left join in SQL.</h2>
                <p>In SQL, the difference between inner join and left join is basically that inner join returns all matching rows within both tables being processed/joined, and left join returns all rows from left table being processed/joined along with matching rows from right table being processed/joined.</p>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="questions-cont">
                <h2>Query where the age is greater than 25.</h2>
                <p>SELECT *<br />
FROM Employers<br />
WHERE age > 25;<br />
</p>
              </div>
            </div>
          </div>
          <div className="footer-copyright">
            <p>Copyright © {new Date().getFullYear()} Designed and Developed by Jose Urbina. All Rights Reserved.</p>
           </div>
          </Container>
      </div>
    </Layout>
  )
}

export default IndexPage
