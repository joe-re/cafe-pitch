export default class QiitaArticle {
  id: number;
  user_id: number;
  title: string;
  raw_body: string;
  body: string;
  body_renderer_version: number;
  uuid: string;
  secret: boolean;
  lang: number;
  via: number;
  tweet: boolean;
  gist: boolean;
  gist_url: string;
  gist_id: number;
  banned: boolean;
  public_likes_count: number;
  created_at: string;
  updated_at: string;
  flags: number;
}