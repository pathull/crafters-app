import { useState, useEffect } from 'react';

import { getAllPosts } from '../../services/fetchData';
import { PostLists } from '../PostLists/PostLists';

export const Dashboard = () => {
  const [allPosts, setAllPosts] = useState<number[] | string[] | bigint[] | boolean[]>([]);

  useEffect(() => {
    getAllPosts().then((data: number[] | string[] | bigint[] | boolean[]) => setAllPosts(data));
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
