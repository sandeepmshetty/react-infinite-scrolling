import React from 'react';
import type { PostItemProps } from '@/types';

export const PostItem: React.FC<PostItemProps> = ({ post, index, style }) => (
  <div className="post-item" style={style}>
    <div className="post-header">
      <h3 className="post-title">{post.title}</h3>
      <span className="post-meta">Post #{index + 1} | User {post.userId}</span>
    </div>
    <p className="post-body">{post.body}</p>
  </div>
);

export const PostSkeleton: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div className="post-item post-skeleton" style={style}>
    <div className="post-header">
      <div className="skeleton-title"></div>
      <div className="skeleton-meta"></div>
    </div>
    <div className="skeleton-body">
      <div className="skeleton-line"></div>
      <div className="skeleton-line"></div>
      <div className="skeleton-line short"></div>
    </div>
  </div>
);
