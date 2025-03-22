export const useLinkList = () => {
  const navArr = [
    // { name: 'Thoughts', to: '/thoughts' },
    // { name: 'Comments', to: '/comments' },
    // { name: 'Account', to: '/account' },
    { name: 'About', to: '/about' }
  ];
  const secondNavArr = [
    { name: 'Search', to: '/articles' },
    { name: 'Tags', to: '/tags' }
  ];

  const mobileNavArr = [
    { name: 'Home', to: '/' },
    { name: 'Articles', to: '/articles' },
    // { name: 'Tags', to: '/tags' },
    // { name: 'Thoughts', to: '/thoughts' },
    // { name: 'Comments', to: '/comments' },
    { name: 'About', to: '/about' }
  ];

  return {
    navArr,
    secondNavArr,
    mobileNavArr
  };
};
