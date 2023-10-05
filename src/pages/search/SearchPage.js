import React, { useEffect } from "react";
import Section from "../../styled-common-components/Section";
import CustomContainer from "../../styled-common-components/CustomContainer";
import SearchInput from "../../components/searchInput/SearchInput";
import { useNavigate } from "react-router-dom";
import { useLoader } from "../../context/LoaderContext";

const SearchPage = () => {
  const navigate = useNavigate();
  const { hideLoader } = useLoader();

  const handleSearch = (e) => {
    navigate(`/discovery?search=${e.current.input.value || ""}&category=`);
  };

  useEffect(() => {
    hideLoader();
  }, []);

  return (
    <Section>
      <CustomContainer>
        <SearchInput
          placeholder="Search Comedia, Show , Post , Video ..."
          onSearch={handleSearch}
        />
      </CustomContainer>
    </Section>
  );
};

export default SearchPage;
