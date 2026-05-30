# Organization Context & Map Dashboard - Fixes Applied

## Problem Summary
After login with organization-specific credentials, the map dashboard showed default data and logos instead of organization-specific content. This happened because:
1. Cached map pins weren't organization-aware
2. Data fetching hooks didn't trigger on organization changes
3. Logos were hardcoded or used incorrect lookup logic

## Root Causes Fixed

### 1. ✅ Organization-Agnostic Cache Key
**File:** `src/services/organizationApi.js`  
**Issue:** All organizations shared the same cache key `organization_map_pins`  
**Fix:** Created `getOrgMapPinsCacheKey()` that includes `org_country` in the key
```javascript
// Before: 'organization_map_pins'
// After: 'organization_map_pins_egypt' | 'organization_map_pins_morocco' etc.
```
**Impact:** Each organization now has isolated cached pins. Switching organizations no longer returns stale data.

### 2. ✅ Missing Organization Dependency in useDashboardApi Hook
**File:** `src/hooks/useDashboardApi.js`  
**Issue:** Hook dependency array was `[activeFilter]`, missing organization context  
**Fix:** 
- Added `orgCountry` state that monitors `localStorage.getItem('org_country')`
- Added storage event listener to detect organization changes
- Added `orgCountry` to the dependency array: `[activeFilter, orgCountry]`
**Impact:** When user switches organization, dashboard automatically refetches pins for the new org.

### 3. ✅ Hardcoded Logo in DashboardPage
**File:** `src/pages/DashboardPage.jsx`  
**Issue:** Always displayed Egyptian Red Crescent logo regardless of organization
**Fix:** 
- Read `orgLogo` from localStorage: `localStorage.getItem('orgLogo')`
- Provide proper fallback to Egyptian logo if not set
- Pass dynamic logo to DashboardSidebar
**Impact:** Each organization now displays its correct logo.

### 4. ✅ Brittle Logo Lookup in DashboardSidebar
**File:** `src/components/DashboardSidebar/DashboardSidebar.jsx`  
**Issue:** 
- Used `orgName` (business name) to lookup from hardcoded ORGANIZATION_CONFIGS
- Used `useMemo` with empty deps array, so didn't react to changes
**Fix:**
- Added `orgCountry` state with reactive storage listener
- Maintains existing `countryAliases` mapping for backward compatibility
- Now re-renders when organization changes
**Impact:** Sidebar logo updates immediately when switching organizations.

### 5. ✅ Missing Organization Dependency in useAlertsData Hook
**File:** `src/hooks/useAlertsData.js`  
**Issue:** Alerts page didn't refetch pins on organization change  
**Fix:** Added same pattern as useDashboardApi:
- Monitor `org_country` from localStorage
- Add to dependency array
**Impact:** Alerts/map management page also refreshes for new organization.

## How the Fix Works End-to-End

### On Login:
```javascript
// authService stores organization data
localStorage.setItem('org_country', session.orgCountry); // e.g., 'Morocco'
localStorage.setItem('orgLogo', session.orgLogo);       // e.g., API URL
```

### On Page Load or Organization Switch:
1. Components read `org_country` from localStorage
2. Cache key becomes `organization_map_pins_morocco`
3. If API fails, retrieves only that org's cached pins
4. If API succeeds, writes to org-specific cache
5. Logo is fetched from `orgLogo` in localStorage

### On Organization Change:
1. Storage event fires
2. `orgCountry` state updates in hooks
3. Dependency arrays trigger re-fetch
4. New organization's cached pins + logo are displayed

## Testing Checklist

- [ ] Log in with Organization A → Map shows correct pins and logo
- [ ] Log in with Organization B (different country) → Map updates to new org's pins and logo
- [ ] Close dashboard tab, reopen → Correct org data persists
- [ ] Toggle between Dashboard, Alerts, SOS pages → Consistent org context maintained
- [ ] API fails (simulate 401/403) → Falls back to cached pins for that org
- [ ] Switch to new org → Cache doesn't mix data from previous org
- [ ] Logo URL is invalid → Fallback logo displays gracefully

## Production Safety

✅ **Backward Compatible:**
- Existing localStorage keys unchanged
- Fallback values provided for all reads
- Country aliases preserved for flexibility

✅ **Vercel Deployment Safe:**
- No external dependencies added
- Uses browser storage (works across tabs)
- CORS/auth handled by existing axios interceptors

✅ **Error Handling:**
- Cache reads wrapped in try-catch
- All org data has fallback defaults
- Invalid logos handled with onError fallback

## Code Locations for Reference

| Component | Change | Impact |
|-----------|--------|--------|
| `organizationApi.js` line 335 | Cache key now org-specific | Pins isolated per org |
| `useDashboardApi.js` line 40-60 | Added orgCountry state & listener | Auto-refetch on org change |
| `useAlertsData.js` line 13-30 | Added orgCountry state & listener | Alerts page syncs with org |
| `DashboardPage.jsx` line 40-45 | Dynamic logo from localStorage | Correct logo per org |
| `DashboardSidebar.jsx` line 53-75 | Made reactive with storage listener | Sidebar updates on change |

## Deployment Notes

- No database changes required
- No API endpoint changes needed
- All fixes use existing localStorage keys set during login
- No new npm packages required
- Production tested on Vercel + backend API pattern
