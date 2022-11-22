import { useState, useEffect } from 'react';

import { getAllPosts } from '../../services/fetchData';
import { PostLists } from '../PostLists/PostLists';
import { postDetails } from '../../types/Post';

export const Dashboard = () => {
  const [allPosts, setAllPosts] = useState<postDetails[]>([]);

  useEffect(() => {
    getAllPosts().then((data: postDetails[]) => setAllPosts(data));
  }, []);

  return (
    <section className="profileSection">
      <div className="profileContainer">
        <div className="listContainer__posts">
          <PostLists postsList={allPosts} />
        </div>
      </div>
    </section>
  );
};
