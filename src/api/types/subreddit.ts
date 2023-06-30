import { Kind } from "./kind.js"
import { Listing } from "./listing.js"
import { Thing } from "./thing.js"

export type Subreddits = Listing<SubredditData>

export interface Subreddit extends Thing<SubredditData> {
	readonly kind: Kind.subreddit
	readonly data: SubredditData
}

export interface SubredditData {
	readonly user_flair_background_color: null
	readonly submit_text_html: null | string
	readonly restrict_posting: boolean
	readonly user_is_banned: boolean
	readonly free_form_reports: boolean
	readonly wiki_enabled: boolean
	readonly user_is_muted: boolean
	readonly user_can_flair_in_sr: null
	readonly display_name: string
	readonly header_img: null
	readonly title: string
	readonly allow_galleries: boolean
	readonly icon_size: number[] | null
	readonly primary_color: string
	readonly active_user_count: null
	readonly icon_img: string
	readonly display_name_prefixed: string
	readonly accounts_active: null
	readonly public_traffic: boolean
	readonly subscribers: number
	readonly user_flair_richtext: unknown[]
	readonly videostream_links_count: number
	readonly name: string
	readonly quarantine: boolean
	readonly hide_ads: boolean
	readonly prediction_leaderboard_entry_type: string
	readonly emojis_enabled: boolean
	readonly advertiser_category: string
	readonly public_description: string
	readonly comment_score_hide_mins: number
	readonly allow_predictions: boolean
	readonly user_has_favorited: boolean
	readonly user_flair_template_id: null
	readonly community_icon: string
	readonly banner_background_image: string
	readonly original_content_tag_enabled: boolean
	readonly community_reviewed: boolean
	readonly submit_text: string
	readonly description_html: null | string
	readonly spoilers_enabled: boolean
	readonly comment_contribution_settings: CommentContributionSettings
	readonly allow_talks: boolean
	readonly header_size: null
	readonly is_default_banner?: boolean
	readonly user_flair_position: string
	readonly is_default_icon?: boolean[]
	readonly all_original_content: boolean
	readonly collections_enabled: boolean
	readonly is_enrolled_in_new_modmail: boolean
	readonly key_color: string
	readonly event_posts_enabled: boolean
	readonly can_assign_user_flair: boolean
	readonly created: number
	readonly wls: null
	readonly mod_permissions: string[]
	readonly show_media_preview: boolean
	readonly submission_type: string
	readonly user_is_subscriber: boolean
	readonly allowed_media_in_comments: unknown[]
	readonly allow_videogifs: boolean
	readonly should_archive_posts: boolean
	readonly user_flair_type: string
	readonly allow_polls: boolean
	readonly collapse_deleted_comments: boolean
	readonly coins?: number
	readonly emojis_custom_size: null
	readonly public_description_html: string
	readonly allow_videos: boolean
	readonly is_crosspostable_subreddit: boolean
	readonly suggested_comment_sort: null | string
	readonly should_show_media_in_comments_setting: boolean
	readonly can_assign_link_flair: boolean
	readonly has_menu_widget: boolean
	readonly accounts_active_is_fuzzed: boolean
	readonly allow_prediction_contributors: boolean
	readonly submit_text_label: string
	readonly link_flair_position: string
	readonly user_sr_flair_enabled: null
	readonly user_flair_enabled_in_sr: boolean
	readonly allow_discovery: boolean
	readonly accept_followers: boolean
	readonly user_sr_theme_enabled: boolean
	readonly link_flair_enabled: boolean
	readonly disable_contributor_requests: boolean
	readonly subreddit_type: string
	readonly notification_level: null
	readonly banner_img: string
	readonly user_flair_text: null
	readonly banner_background_color: string
	readonly show_media: boolean
	readonly id: string
	readonly user_is_moderator: boolean
	readonly over18: boolean
	readonly header_title: string
	readonly description: string
	readonly submit_link_label: string
	readonly user_flair_text_color: null
	readonly restrict_commenting: boolean
	readonly user_flair_css_class: null
	readonly allow_images: boolean
	readonly lang: string
	readonly whitelist_status: null
	readonly url: string
	readonly created_utc: number
	readonly banner_size: null
	readonly mobile_banner_image: string
	readonly user_is_contributor: boolean
	readonly allow_predictions_tournament: boolean
	readonly allow_chat_post_creation?: boolean
	readonly is_chat_post_feature_enabled?: boolean
}

export interface CommentContributionSettings {
	readonly allowed_media_types?: null
}
