# FLAM

*Fierce LAMF Asking Machine* is intended to be a bot that requests explanatory comments under posts in [r/LeopardsAteMyFace](https://www.reddit.com/r/LeopardsAteMyFace).

It's not started yet.

## Theme

The "*leopards ate my face*" theme is embodied by this quote from the sidebar.

> "*I never thought leopards would eat **my** face*", sobs woman who voted for the *Leopards Eating People's Faces Party*. Revel in the schadenfreude anytime someone has a sad because they're suffering consequences from something they voted for, supported or wanted to impose on other people.

```mermaid
flowchart
  Someone -->|suffers from| Consequence
  Someone -->|voted for, supported or<br/>wanted to impose on other people| Something
  Something -->|has| Consequence
```

```mermaid
flowchart
  isit((Is it LAMF?)) --> voted{Did someone voted for,<br/>supported or wanted<br/>to impose something<br/>on other people?}
  voted -->|No| novote(r/AgedLikeMilk<br/>r/ByeByeJob<br/>r/DumbassGraveyard<br/>r/ThatsHowThingsWork<br/>r/WinStupidPrizes)
  voted -->|Yes| suffers{Do they suffer<br/>consequences<br/>from that<br/>something?}
  suffers -->|No| noconsequences(r/CapitolConsequences<br/>r/JusticeServed<br/>r/QuitYourBullshit<br/>r/SelfAwareWolves<br/>r/ThisYouComebacks<br/>r/TrumpCriticizesTrump)
  suffers -->|Yes| itis((It is LAMF!))
```
