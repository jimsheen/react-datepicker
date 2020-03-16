import React from 'react';
import axios from 'axios';

import { getDateArray } from '../../utils/calendarHelper';

export default ({ fromDate }) => {

  const [fact, setFact] = React.useState({
    isLoading: false,
    data: '',
    error: null,
  });

  React.useEffect(() => {
    if (fromDate) {
      const startDate = getDateArray(new Date(fromDate))
      setFact({
        isLoading: true,
      });

      axios.get(`http://numbersapi.com/${startDate[1]}/${startDate[2]}/date`)
        .then(res =>
          setFact({
            data: res.data,
            isLoading: false,
          }))
        .catch(error => {
          setFact({
            data: null,
            isLoading: false,
            error
          })
        });
    }
  }, [fromDate])


  return (
  	<React.Fragment>
  		{fact.isLoading && fromDate &&
				<p>Loading fact for day...</p>
			}
			{!fact.isLoading &&
				<p>{fact.data}</p>
			}
			{fact.error && !fact.isLoading &&
				<p>Error fetching data for date</p>
			}
		</React.Fragment>
  )
}