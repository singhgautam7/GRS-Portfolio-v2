---
title: "AI Book Reader — Deep Case Study"
date: "2026-02-10"
tldr: "AI Book Reader is a privacy-first web application that transforms personal documents and web articles into audiobooks using multiple AI text-to-speech providers. Built entirely client-side, it supports offline reading, premium AI voices, audio caching, playback history, and an immersive reader experience without uploading files to any server."
tags: ["AI", "TTS", "System Design"]
timeline: true
timeline_pointers:
  - AI Book Reader is a privacy-first, browser-based application that converts PDFs, EPUBs, and web articles into immersive audiobooks
  - It uses multiple AI text-to-speech providers — without uploading files to any server
---

## Executive Summary

AI Book Reader is a privacy-first, browser-based application that converts PDFs, EPUBs, and web articles into immersive audiobooks using multiple AI text-to-speech providers — without uploading files to any server.

Unlike typical audiobook tools, it:
-   Works entirely client-side
-   Supports multiple TTS engines (Browser, Gemini, OpenAI, ElevenLabs)
-   Caches generated audio to minimize API costs
-   Preserves reading progress and playback history
-   Provides a real reader-like experience with chunk highlighting
-   Supports both documents and live web articles

Built as an all-in-one AI narration platform.


## Problem Statement

Traditional audiobook solutions suffer from:
-   Lack of support for personal documents
-   Privacy concerns due to cloud uploads
-   Expensive subscriptions
-   Robotic voices
-   No support for web articles
-   No offline capability
-   Poor reading UX


## Solution
Create a unified AI reading platform that:
-   Reads personal files locally
-   Supports premium AI voices when available
-   Works offline using browser TTS
-   Handles large documents via chunking
-   Preserves structure and formatting
-   Minimizes API usage via caching
-   Tracks reading history

## Key Features

### Multi-Source Input
-   PDF
-   EPUB
-   Web article links
-   Testing mode sample text


### Multi-Engine TTS Support
| Provider | Provider | Use-case |
|--|--|--|
| Browser Native | Offline | Free fallback |
| Gemini TTS | Cloud | Balanced quality |
| OpenAI TTS | Cloud | Natural voices |
| ElevnLabs | Cloud | Premium narration |



### Chunk-Based Reading Engine
Large content is split into manageable segments:
-   Prevents API limits
-   Enables auto-play sequencing
-   Supports pause/resume
-   Allows per-chunk caching

### Audio Caching System

Generated audio is stored locally:
-   Reduces API cost
-   Improves responsiveness
-   Enables replay without regeneration

### Library and Playback History

Tracks:
-   Uploaded items
-   Last played timestamp
-   Reader used
-   Playback history
-   Unique entries only


### Reader UX Enhancements
-   Translucent highlight for active chunk
-   Paragraph preservation
-   Adjustable voice settings
-   Auto-play next chunk toggle
-   Provider-specific controls
-   Theme support


### Privacy-First Design

-   Files processed locally
-   Encrypted API keys stored in local storage
-   No backend storage
-   Direct provider communication


## System Architecture (High Level)

```
User
  ↓
React Frontend (SPA)
  ↓
Content Processing Layer
  ↓
TTS Adapter Layer
  ↓
Provider APIs / Browser TTS
  ↓
Audio Playback Engine
  ↓
Local Cache + History

```


## Frontend Architecture

```
UI Layer (React + shadcn)
 ├─ Home / Library
 ├─ Reader View
 ├─ Settings
 └─ Help

State Layer
 ├─ Global Settings Store
 ├─ Reader State
 └─ Library State

Service Layer
 ├─ File Parser
 ├─ Link Scraper
 ├─ Chunk Generator
 ├─ TTS Adapter
 └─ Cache Manager

```


## Reading Flow (Sequence)

```
Upload File / Paste Link
        ↓
Text Extraction
        ↓
Chunk Generation
        ↓
User clicks Play
        ↓
Check Cache
   ├─ Found → Play immediately
   └─ Not found → Call TTS API
                      ↓
                Save Audio Blob
                      ↓
                   Play Audio

```

## TTS Provider Adapter Pattern

Each provider implements a unified interface:
```
generateSpeech(text, settings) → audioBlob

```
Adapters handle provider-specific differences:
-   Request formats
-   Voice parameters
-   Authentication
-   Rate limits
-   Streaming vs batch audio


## Caching Strategy

Cache is based on both content and settings.
```
Cache Key =
hash(
  text chunk +
  provider +
  voice +
  speed +
  pitch +
  emotion +
  model
)

```

Storage:
-   IndexedDB for large blobs
-   LocalStorage for metadata


## Web Article Processing Pipeline

```
URL Input
   ↓
Fetch HTML
   ↓
Content Extraction
   ↓
Sanitization
   ↓
Structure Reconstruction
   ↓
Chunking
   ↓
Reader

```

Handles:
-   Titles
-   Paragraphs
-   Lists
-   Sections


## Data Persistence Model

Stored locally.

### Library Item

```
id
title
type (PDF | EPUB | LINK)
format
chunks
addedAt
lastPlayed
readerUsed
```

### Playback History
```
itemId
datetime
reader
settingsSnapshot
```

----------

## Performance Optimizations
-   Lazy chunk generation
-   On-demand audio generation
-   Audio caching
-   Minimal re-renders
-   Client-side processing
-   No server latency

## Trade-Offs Considered

### No Backend Architecture

**Advantages**
-   Maximum privacy
-   Lower infrastructure cost
-   Simpler deployment

**Disadvantages**
-   No cross-device sync
-   Browser storage limits

### Chunking Strategy
Necessary for:
-   Long documents
-   API limits
-   Streaming UX
-   Fine-grained caching


## Security Considerations

-   API keys stored locally only
-   No server transmission
-   No tracking
-   No telemetry


## Future Improvements

Potential roadmap:
-   Cross-device sync (optional cloud)
-   Voice cloning support
-   Annotation and bookmarks
-   Multi-language translation
-   Podcast-style playback
-   Mobile PWA mode
-   Mutliple voices in a story
-   Document OCR support


## Why This Project Stands Out

This is not a simple CRUD application.
It demonstrates:
-   Applied AI integration
-   System design thinking
-   UX engineering
-   Performance optimization
-   Privacy-centric architecture
-   Multi-provider abstraction
-   Product-level decision making


## Deployment Model
Yet to be deployed, but here is an example:
```
Static Hosting (Vercel / Netlify / GitHub Pages)
            ↓
   Runs entirely in browser
```

No backend required.

