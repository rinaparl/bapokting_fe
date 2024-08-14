
// import PropTypes from 'prop-types';
// import { useSearchParams } from 'react-router-dom';
import Tabel from '../components/KomoditiTable';
import SearchBar from '../components/SearchBar';

function HomePageWrapper() {

    return (
      <div className='homepage'>
        <SearchBar
        //   keyword={this.state.keyword}
        //   keywordChange={this.onKeywordChangeHandler}
        />
        <Tabel 
        // data={filteredKomoditi}
         />
      </div>
    );
  }
// }

// HomePage.propTypes = {
//   defaultKeyword: PropTypes.string,
//   keywordChange: PropTypes.func.isRequired,
// };

export default HomePageWrapper;
