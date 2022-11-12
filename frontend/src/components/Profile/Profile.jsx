import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useSearchParams } from 'react-router-dom';
import { RotatingLines } from 'react-loader-spinner';

import './Profile.css';

import { retrievePosts } from '../../services/fetchData';
import { PostLists } from '../PostLists/PostLists';
import { UserInfo } from '../UserInfo/UserInfo';

export const Profile = () => {
  const { user } = useAuth0();
  const [searchParams] = useSearchParams();
  const [posts, setPosts] = useState([]);

  if (searchParams.get('success') === 'true') {
    console.log('Thank for your business');
  } else if (searchParams.get('canceled') === 'true') {
    console.log('Something went wrong');
  }

  useEffect(() => {
    if (user) {
      retrievePosts(user.email).then(data => setPosts(data));
    }
  }, [user]);

  return (
    <section className="profileSection">
      {user ? (
        <div className="profileContainer">
          <UserInfo user={user} postNumber={posts.length} />

          <div className="listContainer__posts">
            <PostLists postsList={posts} />
          </div>
        </div>
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <RotatingLines strokeColor="grey" strokeWidth="5" animationDuration="0.75" width="200" visible={true} />
        </div>
      )}
    </section>
  );
};
