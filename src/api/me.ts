import { Kind } from "./kind.js"
import { Thing } from "./thing.js"

export interface Me extends Thing<MeData> {
	readonly loid: string
	readonly loid_created: number
	readonly kind: Kind.account
	readonly data: MeData
}

export interface MeData {
	readonly is_employee: boolean
	readonly has_visited_new_profile: boolean
	readonly is_friend: boolean
	readonly pref_no_profanity: boolean
	readonly has_external_account: boolean
	readonly pref_geopopular: string
	readonly pref_show_trending: boolean
	readonly subreddit: Subreddit
	readonly pref_show_presence: boolean
	readonly has_ios_subscription: boolean
	readonly snoovatar_size: null
	readonly gold_expiration: null
	readonly has_gold_subscription: boolean
	readonly is_sponsor: boolean
	readonly num_friends: number
	readonly features: Features
	readonly can_edit_name: boolean
	readonly verified: boolean
	readonly new_modmail_exists: boolean
	readonly pref_autoplay: boolean
	readonly coins: number
	readonly has_paypal_subscription: boolean
	readonly has_subscribed_to_premium: boolean
	readonly id: string
	readonly force_password_reset: boolean
	readonly can_create_subreddit: boolean
	readonly over_18: boolean
	readonly is_gold: boolean
	readonly is_mod: boolean
	readonly awarder_karma: number
	readonly suspension_expiration_utc: null
	readonly has_stripe_subscription: boolean
	readonly is_suspended: boolean
	readonly pref_video_autoplay: boolean
	readonly in_chat: boolean
	readonly has_android_subscription: boolean
	readonly in_redesign_beta: boolean
	readonly icon_img: string
	readonly has_mod_mail: boolean
	readonly pref_nightmode: boolean
	readonly awardee_karma: number
	readonly hide_from_robots: boolean
	readonly password_set: boolean
	readonly modhash: string
	readonly link_karma: number
	readonly is_blocked: boolean
	readonly total_karma: number
	readonly inbox_count: number
	readonly pref_top_karma_subreddits: boolean
	readonly has_mail: boolean
	readonly pref_show_snoovatar: boolean
	readonly name: string
	readonly pref_clickgadget: number
	readonly created: number
	readonly has_verified_email: boolean
	readonly gold_creddits: number
	readonly created_utc: number
	readonly snoovatar_img: string
	readonly pref_show_twitter: boolean
	readonly in_beta: boolean
	readonly comment_karma: number
	readonly accept_followers: boolean
	readonly has_subscribed: boolean
}

export interface Features {
	readonly modmail_harassment_filter: boolean
	readonly mod_service_mute_writes: boolean
	readonly promoted_trend_blanks: boolean
	readonly show_amp_link: boolean
	readonly chat: boolean
	readonly mweb_link_tab: Mweb
	readonly is_email_permission_required: boolean
	readonly mod_awards: boolean
	readonly expensive_coins_package: boolean
	readonly mweb_xpromo_revamp_v2: Mweb
	readonly awards_on_streams: boolean
	readonly webhook_config: boolean
	readonly mweb_xpromo_modal_listing_click_daily_dismissible_ios: boolean
	readonly live_orangereds: boolean
	readonly cookie_consent_banner: boolean
	readonly modlog_copyright_removal: boolean
	readonly do_not_track: boolean
	readonly images_in_comments: boolean
	readonly mod_service_mute_reads: boolean
	readonly chat_user_settings: boolean
	readonly use_pref_account_deployment: boolean
	readonly mweb_xpromo_interstitial_comments_ios: boolean
	readonly chat_subreddit: boolean
	readonly mweb_xpromo_modal_listing_click_daily_dismissible_android: boolean
	readonly premium_subscriptions_table: boolean
	readonly mweb_xpromo_interstitial_comments_android: boolean
	readonly crowd_control_for_post: boolean
	readonly mweb_nsfw_xpromo: Mweb
	readonly chat_group_rollout: boolean
	readonly resized_styles_images: boolean
	readonly noreferrer_to_noopener: boolean
}

export interface Mweb {
	readonly owner: string
	readonly variant: string
	readonly experiment_id: number
}

export interface Subreddit {
	readonly default_set: boolean
	readonly banner_img: string
	readonly allowed_media_in_comments: unknown[]
	readonly user_is_banned: boolean
	readonly free_form_reports: boolean
	readonly community_icon: null
	readonly show_media: boolean
	readonly description: string
	readonly user_is_muted: null
	readonly display_name: string
	readonly header_img: null
	readonly title: string
	readonly coins: number
	readonly previous_names: string[]
	readonly user_is_moderator: boolean
	readonly over_18: boolean
	readonly icon_size: number[]
	readonly primary_color: string
	readonly icon_img: string
	readonly icon_color: string
	readonly submit_link_label: string
	readonly header_size: null
	readonly restrict_posting: boolean
	readonly restrict_commenting: boolean
	readonly subscribers: number
	readonly submit_text_label: string
	readonly is_default_icon: boolean
	readonly link_flair_position: string
	readonly display_name_prefixed: string
	readonly key_color: string
	readonly name: string
	readonly is_default_banner: boolean
	readonly url: string
	readonly quarantine: boolean
	readonly banner_size: number[]
	readonly user_is_contributor: boolean
	readonly accept_followers: boolean
	readonly public_description: string
	readonly link_flair_enabled: boolean
	readonly disable_contributor_requests: boolean
	readonly subreddit_type: string
	readonly user_is_subscriber: boolean
}
