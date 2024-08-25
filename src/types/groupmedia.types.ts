export interface GroupMedia {
    id: number;
    created_at: string;
    added_by: string;
    added_reason: string;
    watched: boolean;
    group_id: string;
    media_id: number;
    media: {
      created_at: string;
      tmdb_id: number;
      title: string;
      poster_path: string;
      genres: string[];
      media_type: string;
    };
    user_public_profile: {
      user_name: string;
      profile_pic: string;
    };
  }