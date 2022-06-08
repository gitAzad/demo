import React, { useEffect, useState } from 'react';
import Button from '../components/form-controll/Button';
import { useNavigate } from 'react-router-dom';
import { useQuery, useQueryClient } from 'react-query';
import useDebounce from '../components/hooks/useDebounce';
import { getAllDocuments } from '../apis/customApihandler';
import toast from 'react-hot-toast';

function timeSince(date: any) {
  var seconds = Math.floor((new Date().valueOf() - date.valueOf()) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + ' years';
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + ' months';
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + ' days';
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + ' hours';
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}

const Home = () => {
  const [filter, setFilter] = useState(null);
  const [sort, setSort] = useState('createdAt');
  useEffect(() => {
    console.log({
      filter: filter,
    });
  }, [filter]);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const {
    data: newsData,
    status,
    isLoading,
  } = useQuery(
    ['news', debouncedSearchQuery && debouncedSearchQuery, filter],
    () =>
      getAllDocuments('/news', {
        ...(debouncedSearchQuery && { q: debouncedSearchQuery }),
        ...(filter?.technology?.length > 0 && {
          'inList[technology]': filter.technology.map((tech) => tech).join(','),
        }),
        ...(filter?.author?.length > 0 && {
          'inList[author]': filter.author.map((a) => a).join(','),
        }),
        sort: sort,
      })
  );

  const [sortByModelOpen, setSortByModelOpen] = React.useState(false);
  const [filterModelOpen, setFilterModelOpen] = React.useState(false);
  const navigate = useNavigate();
  const sortByRef = React.useRef<HTMLDivElement>(null);
  const filterRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...');
    }
    if (status === 'success') {
      toast.dismiss();
    }
    if (status === 'error') {
      toast.error('Something went wrong');
    }
  }, [status, isLoading]);

  const handleOutsideSortClick = (e: any) => {
    if (sortByRef.current && !sortByRef.current.contains(e.target)) {
      setSortByModelOpen(false);
    }
  };

  useEffect(() => {
    if (sortByModelOpen) {
      document.addEventListener('click', handleOutsideSortClick);
    } else {
      document.removeEventListener('click', handleOutsideSortClick);
    }
  }, [sortByModelOpen]);

  // const handleOutsideFilterClick = (e: any) => {
  //   if (filterRef.current && !filterRef.current.contains(e.target)) {
  //     setFilterModelOpen(false);
  //   }
  // };

  // useEffect(() => {
  //   if (filterModelOpen) {
  //     document.addEventListener('click', handleOutsideFilterClick);
  //   } else {
  //     document.removeEventListener('click', handleOutsideFilterClick);
  //   }
  // }, [filterModelOpen]);

  return (
    <div className="bg-gray-50 flex justify-center items-center">
      <div className=" bg-white rounded-md p-4  max-w-md shadow-md ">
        <div className="flex justify-between items-center gap-2">
          <div
            className="flex justify-start items-center gap-2 hover:scale-110 cursor-pointer origin-left"
            onClick={() => navigate('/profile')}
          >
            <img
              src="https://robohash.org/fd65a21e340562b397154e3d9f6bdaae?set=set4&bgset=&size=400x400"
              alt="avatar"
              className="w-12 h-12 bg-white rounded-full"
            />
            <span className="font-bold text-gray-800 text-lg">Hi User</span>
          </div>
          <div className="text-lg font-light">Welcome</div>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-gray-100 appearance-none border-2 border-gray-100 rounded-lg w-full mt-4 py-4 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-primary"
          />
          <img
            src="assets/svg/search.svg"
            alt="search"
            className="  z-10 w-6 h-6 absolute bottom-4 right-4"
          />
        </div>

        <div className="flex justify-between items-center p-2 pt-4 text-primary ">
          <div
            ref={sortByRef}
            className="flex justify-center items-center gap-2 hover:scale-110 cursor-pointer"
            onClick={() => setSortByModelOpen((pre) => !pre)}
          >
            <span>SortBy</span>
            <img src="assets/svg/sort.svg" alt="sort" className="" />
          </div>

          <div
            ref={filterRef}
            className="flex justify-center items-center gap-2 hover:scale-110 cursor-pointer"
            onClick={() => setFilterModelOpen((pre) => !pre)}
          >
            <span>Filter</span>
            <img src="assets/svg/filter.svg" alt="sort" className="" />
          </div>
        </div>

        <div>
          {!isLoading &&
            newsData.data &&
            newsData.data.map((news) => (
              <div
                key={news._id}
                className="flex justify-start items-stretch p-2 gap-2 h-full w-full"
              >
                <img
                  src={news?.imgUrl}
                  alt="news"
                  className="w-32 h-32 object-cover bg-white rounded-md"
                />
                <div className="flex flex-col justify-between h-[120px]">
                  <div className="flex flex-col justify-center items-start">
                    <div className="flex justify-center items-center gap-2">
                      <span className="font-bold text-primary">
                        {news?.technology?.title}
                      </span>
                      <img
                        src="assets/svg/dot.svg"
                        alt="dot"
                        className="w-1 h-1"
                      />
                      <span className="text-gray-400 text-sm">
                        {
                          //format date and time like 5 min ago 2 hour ago or 2 days ago
                          timeSince(new Date(news?.createdAt))
                        }{' '}
                        ago
                      </span>
                    </div>
                    <div className="text-gray-600 text-sm">{news?.title}</div>
                  </div>
                  <div>
                    <p className="text-gray-500 font-medium text-sm">
                      by
                      <span className="text-primary  ml-2 font-medium text-sm">
                        {news?.author?.username}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {sortByModelOpen && (
          <SortByComponent
            handleClick={() => setSortByModelOpen(false)}
            setSort={setSort}
          />
        )}
        {filterModelOpen && (
          <FilterComponent
            handleClick={() => setFilterModelOpen(false)}
            setFilter={setFilter}
          />
        )}
      </div>
    </div>
  );
};

export default Home;

export const SortByComponent = ({ handleClick, setSort }) => {
  return (
    <div className=" bg-white h-[200px]  w-[400px] max-w-md absolute top-1/2  left-1/2 -translate-x-1/2 rounded-lg shadow-lg p-4 ">
      <div className="flex justify-between items-center border-b pb-4">
        <p className="text-primary">Sort By</p>
        <img
          src="assets/svg/close.svg"
          alt="close"
          className="hover:scale-110 cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div
        onClick={() => setSort('-createdAt')}
        className="mt-8 text-gray-700 font-light py-4 hover:text-primary hover:scale-110 origin-left cursor-pointer"
      >
        <div>Most Recent</div>
      </div>
    </div>
  );
};

export const FilterComponent = ({ handleClick, setFilter }) => {
  const [tab, setTab] = useState(0);
  const qClient = useQueryClient();

  const [formData, setFormData] = useState({
    technology: [],
    author: [],
  });

  const { data: techData } = useQuery(['technology'], () =>
    getAllDocuments('/technology', {
      ...{},
    })
  );

  const { data: authorsData } = useQuery(['authors'], () =>
    getAllDocuments('/users', {
      ...{ userType: 'AUTHOR' },
    })
  );

  const handleApply = () => {
    setFilter(formData);
    handleClick();
  };

  const handleReset = async () => {
    setFormData({
      technology: [],
      author: [],
    });
    setFilter(null);
    await qClient.invalidateQueries('news');
    handleClick();
  };

  return (
    <div className=" bg-white min-h-[200px]   w-[400px] max-w-md absolute top-1/2  left-1/2 -translate-x-1/2 rounded-lg shadow-lg  ">
      <div className="p-4 flex justify-between items-center border-b pb-4">
        <p className="text-primary">Filter</p>
        <img
          src="assets/svg/close.svg"
          alt="close"
          className="hover:scale-110 cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="flex justify-start items-start gap-8">
        <div className="flex flex-col gap-2 text-gray-600 p-4">
          <p
            className={`${
              tab === 0 ? 'hover:text-gray-800 font-semibold' : ''
            } hover:scale-110 cursor-pointer`}
            onClick={() => setTab(0)}
          >
            Technology
          </p>
          <p
            className={`${
              tab === 1 ? 'hover:text-gray-800 font-semibold' : ''
            } hover:scale-110 cursor-pointer`}
            onClick={() => setTab(1)}
          >
            Author
          </p>
        </div>
        <div className="flex flex-col h-full bg-primary bg-opacity-5 w-full p-4 divide-y">
          {tab === 0 &&
            techData?.data &&
            techData?.data?.map((tech) => (
              <div className="p-2">
                <input
                  type="checkbox"
                  className="bg-transparent border-none accent-primary"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        technology: [...formData.technology, tech._id],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        technology: formData.technology.filter(
                          (id) => id !== tech._id
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="checkbox" className="text-gray-700 ml-4">
                  {tech?.title}
                </label>
              </div>
            ))}

          {tab === 1 &&
            authorsData?.data &&
            authorsData?.data?.map((author) => (
              <div className="p-2">
                <input
                  type="checkbox"
                  className="bg-transparent border-none accent-primary"
                  id="checkbox"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormData({
                        ...formData,
                        author: [...formData.author, author._id],
                      });
                    } else {
                      setFormData({
                        ...formData,
                        author: formData.author.filter(
                          (id) => id !== author._id
                        ),
                      });
                    }
                  }}
                />
                <label htmlFor="checkbox" className="text-gray-700 ml-4">
                  {author?.username}
                </label>
              </div>
            ))}

          <div className="flex pt-4 ">
            <Button
              className="rounded-tr-none rounded-br-none"
              secondary
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              className="rounded-tl-none rounded-bl-none"
              onClick={handleApply}
            >
              Apply
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
