import React, { useEffect, useContext, useState } from 'react';

import { UserContext } from '../../context/UserContext';
import { PostLists } from '../PostLists/PostLists';
import { getListWishListByUser } from '../../services/fetchWishList';
import { postDetails } from '../../types/Post';

export const WishList = () => {
  const [postList, setPostList] = useState<postDetails[]>([]);
  const { userData } = useContext(UserContext);

  useEffect(() => {
    if (userData) {
      getListWishListByUser(userData.id).then(list => setPostList(list));
    }
  }, [userData]);

  return (
    <section className="profileSection">
      <div className="profileContainer">
        <div className="listContainer__posts">
          <PostLists postsList={postList} setPostList={setPostList} />
        </div>
      </div>
    </section>
  );
};
