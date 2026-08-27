-- Initial schema: visitors, sessions, events, and the rate-limit counter
-- table. (_migrations itself is bootstrapped by migrate.ts, not here.)

-- One row per anonymous visitor (a browser, identified by a client-generated
-- UUID kept in localStorage). No name/email/raw-IP by default.
CREATE TABLE IF NOT EXISTS visitors (
  id UUID PRIMARY KEY,
  first_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_seen TIMESTAMPTZ NOT NULL DEFAULT now(),
  visit_count INTEGER NOT NULL DEFAULT 1,
  ip_hash TEXT,
  ip_encrypted TEXT,
  country TEXT,
  region TEXT,
  city TEXT,
  timezone TEXT,
  is_returning BOOLEAN NOT NULL DEFAULT false
);

-- One row per browsing session (a client-generated UUID, rotated after 30
-- minutes of inactivity).
CREATE TABLE IF NOT EXISTS sessions (
  id UUID PRIMARY KEY,
  visitor_id UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_activity_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  ended_at TIMESTAMPTZ,
  referrer TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_term TEXT,
  utm_content TEXT,
  browser TEXT,
  os TEXT,
  device_type TEXT,
  screen_width INTEGER,
  screen_height INTEGER,
  language TEXT,
  entry_page TEXT,
  active_seconds INTEGER NOT NULL DEFAULT 0,
  max_scroll_depth INTEGER NOT NULL DEFAULT 0,
  last_section_viewed TEXT,
  page_view_count INTEGER NOT NULL DEFAULT 0,
  is_bot BOOLEAN NOT NULL DEFAULT false
);

-- One row per tracked interaction.
CREATE TABLE IF NOT EXISTS events (
  id BIGSERIAL PRIMARY KEY,
  session_id UUID NOT NULL REFERENCES sessions(id) ON DELETE CASCADE,
  visitor_id UUID NOT NULL REFERENCES visitors(id) ON DELETE CASCADE,
  event_name TEXT NOT NULL,
  page TEXT,
  section TEXT,
  element_id TEXT,
  label TEXT,
  destination_url TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Fixed-window request counters backing the collect endpoint's rate limiter.
CREATE TABLE IF NOT EXISTS rate_limits (
  key TEXT PRIMARY KEY,
  count INTEGER NOT NULL DEFAULT 1,
  window_start TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_visitors_last_seen ON visitors(last_seen);
CREATE INDEX IF NOT EXISTS idx_sessions_visitor ON sessions(visitor_id);
CREATE INDEX IF NOT EXISTS idx_sessions_started_at ON sessions(started_at);
CREATE INDEX IF NOT EXISTS idx_sessions_active ON sessions(started_at) WHERE is_bot = false;
CREATE INDEX IF NOT EXISTS idx_events_session ON events(session_id);
CREATE INDEX IF NOT EXISTS idx_events_visitor ON events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_events_name ON events(event_name);
CREATE INDEX IF NOT EXISTS idx_events_page ON events(page);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at);
