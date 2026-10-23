import { useState } from 'react'
import './QuestionLab.css'

interface CodeSnippets {
  typescript: string
  python: string
  cpp: string
  java: string
}

interface Question {
  id: number
  title: string
  companies: string[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  topic: string
  acceptance: string
  timeComplexity: string
  spaceComplexity: string
  description: string
  example: string
  constraints: string[]
  snippets: CodeSnippets
  testCases: { input: string; expected: string }[]
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'Two Sum (Optimal Dual Pointer & Map)',
    companies: ['Google', 'Amazon', 'Meta'],
    difficulty: 'Easy',
    topic: 'Hash Tables & Arrays',
    acceptance: '84.2%',
    timeComplexity: 'O(N)',
    spaceComplexity: 'O(N)',
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume each input has exactly one valid solution.',
    example: 'Input: nums = [2, 7, 11, 15], target = 9\nOutput: [0, 1] (nums[0] + nums[1] == 9)',
    constraints: ['2 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9', 'Exactly one valid answer exists'],
    snippets: {
      typescript: `function twoSum(nums: number[], target: number): number[] {
  const map = new Map<number, number>();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement)!, i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []`,
      cpp: `vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> lookup;
    for (int i = 0; i < nums.size(); ++i) {
        int comp = target - nums[i];
        if (lookup.count(comp)) return {lookup[comp], i};
        lookup[nums[i]] = i;
    }
    return {};
}`,
      java: `public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> map = new HashMap<>();
    for (int i = 0; i < nums.length; i++) {
        int comp = target - nums[i];
        if (map.containsKey(comp)) return new int[] { map.get(comp), i };
        map.put(nums[i], i);
    }
    return new int[]{};
}`
    },
    testCases: [
      { input: 'nums = [2,7,11,15], target = 9', expected: '[0, 1]' },
      { input: 'nums = [3,2,4], target = 6', expected: '[1, 2]' },
      { input: 'nums = [3,3], target = 6', expected: '[0, 1]' },
    ]
  },
  {
    id: 2,
    title: 'Longest Common Subsequence (2D DP)',
    companies: ['Microsoft', 'Flipkart', 'Amazon'],
    difficulty: 'Medium',
    topic: 'Dynamic Programming',
    acceptance: '62.8%',
    timeComplexity: 'O(M × N)',
    spaceComplexity: 'O(M × N)',
    description: 'Given two strings text1 and text2, return the length of their longest common subsequence. If there is no common subsequence, return 0.',
    example: 'Input: text1 = "abcde", text2 = "ace"\nOutput: 3 (The LCS is "ace")',
    constraints: ['1 <= text1.length, text2.length <= 1000', 'Strings contain only lowercase English characters'],
    snippets: {
      typescript: `function longestCommonSubsequence(text1: string, text2: string): number {
  const m = text1.length, n = text2.length;
  const dp: number[][] = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }
  return dp[m][n];
}`,
      python: `def longest_common_subsequence(text1: str, text2: str) -> int:
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i - 1] == text2[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])
    return dp[m][n]`,
      cpp: `int longestCommonSubsequence(string t1, string t2) {
    int m = t1.size(), n = t2.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));
    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            dp[i][j] = (t1[i - 1] == t2[j - 1]) ? dp[i - 1][j - 1] + 1 : max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`,
      java: `public int longestCommonSubsequence(String text1, String text2) {
    int m = text1.length(), n = text2.length();
    int[][] dp = new int[m + 1][n + 1];
    for (int i = 1; i <= m; i++) {
        for (int j = 1; j <= n; j++) {
            dp[i][j] = (text1.charAt(i - 1) == text2.charAt(j - 1)) ? dp[i - 1][j - 1] + 1 : Math.max(dp[i - 1][j], dp[i][j - 1]);
        }
    }
    return dp[m][n];
}`
    },
    testCases: [
      { input: 'text1 = "abcde", text2 = "ace"', expected: '3' },
      { input: 'text1 = "abc", text2 = "abc"', expected: '3' },
      { input: 'text1 = "abc", text2 = "def"', expected: '0' },
    ]
  },
  {
    id: 3,
    title: 'LRU Cache Design (Doubly Linked + Map)',
    companies: ['Google', 'Meta', 'Uber'],
    difficulty: 'Hard',
    topic: 'System Design & Data Structures',
    acceptance: '48.9%',
    timeComplexity: 'O(1) Get / Put',
    spaceComplexity: 'O(Capacity)',
    description: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache with O(1) amortized get and put operations.',
    example: 'LRUCache(2) -> put(1,1), put(2,2), get(1)->1, put(3,3) evicts key 2, get(2)->-1',
    constraints: ['1 <= capacity <= 3000', '0 <= key <= 10^4', 'At most 2 * 10^5 calls will be made to get and put'],
    snippets: {
      typescript: `class LRUCache {
  private capacity: number;
  private map = new Map<number, number>();

  constructor(capacity: number) {
    this.capacity = capacity;
  }

  get(key: number): number {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key)!;
    this.map.delete(key);
    this.map.set(key, val);
    return val;
  }

  put(key: number, value: number): void {
    if (this.map.has(key)) this.map.delete(key);
    else if (this.map.size === this.capacity) {
      this.map.delete(this.map.keys().next().value!);
    }
    this.map.set(key, value);
  }
}`,
      python: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cap = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.cap:
            self.cache.popitem(last=False)`,
      cpp: `class LRUCache {
    int cap;
    list<pair<int, int>> lru;
    unordered_map<int, list<pair<int, int>>::iterator> mp;
public:
    LRUCache(int capacity) : cap(capacity) {}
    int get(int key) {
        if (!mp.count(key)) return -1;
        lru.splice(lru.begin(), lru, mp[key]);
        return mp[key]->second;
    }
    void put(int key, int val) {
        if (mp.count(key)) {
            lru.splice(lru.begin(), lru, mp[key]);
            mp[key]->second = val;
            return;
        }
        if (lru.size() == cap) {
            mp.erase(lru.back().first);
            lru.pop_back();
        }
        lru.emplace_front(key, val);
        mp[key] = lru.begin();
    }
};`,
      java: `class LRUCache {
    private final int capacity;
    private final LinkedHashMap<Integer, Integer> map;
    public LRUCache(int capacity) {
        this.capacity = capacity;
        this.map = new LinkedHashMap<>(capacity, 0.75f, true) {
            protected boolean removeEldestEntry(Map.Entry eldest) {
                return size() > capacity;
            }
        };
    }
    public int get(int key) { return map.getOrDefault(key, -1); }
    public void put(int key, int value) { map.put(key, value); }
}`
    },
    testCases: [
      { input: 'LRUCache(2), put(1,1), put(2,2), get(1)', expected: '1' },
      { input: 'put(3,3), get(2)', expected: '-1 (evicted)' },
      { input: 'put(4,4), get(1)', expected: '-1 (evicted)' },
    ]
  }
]

export default function QuestionLab() {
  const [activeQuestion, setActiveQuestion] = useState<Question>(QUESTIONS[0])
  const [selectedLang, setSelectedLang] = useState<'typescript' | 'python' | 'cpp' | 'java'>('typescript')
  const [activeTab, setActiveTab] = useState<'editor' | 'problem' | 'telemetry'>('editor')
  const [executionState, setExecutionState] = useState<'idle' | 'running' | 'done'>('idle')
  const [activeTestIndex, setActiveTestIndex] = useState(0)

  const handleRunCode = () => {
    setExecutionState('running')
    setTimeout(() => {
      setExecutionState('done')
    }, 1100)
  }

  const codeLines = activeQuestion.snippets[selectedLang].split('\n')

  return (
    <section className="qlab" id="practice" aria-labelledby="qlab-heading">
      <div className="container">
        {/* Section Header */}
        <div className="qlab__header">
          <div className="tag tag--lime">INTERACTIVE CODE STUDIO</div>
          <h2 id="qlab-heading" className="qlab__heading">
            Zero-Friction Interview Simulator
          </h2>
          <p className="qlab__sub">
            Switch languages, inspect Big-O complexity profiles, and trigger real-time
            test suite execution against actual FAANG problem constraints.
          </p>
        </div>

        {/* IDE Layout Container */}
        <div className="qlab__studio">
          {/* Left: Problem Selector & Topic Navigator */}
          <div className="qlab__sidebar">
            <div className="qlab__sidebar-header">
              <span className="lbl">QUESTION VAULT</span>
              <span className="count">1,200+ ACTIVE</span>
            </div>

            <div className="qlab__question-list" role="listbox">
              {QUESTIONS.map(q => {
                const isSelected = q.id === activeQuestion.id
                return (
                  <button
                    key={q.id}
                    type="button"
                    className={`qlab__q-item ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      setActiveQuestion(q)
                      setExecutionState('idle')
                    }}
                  >
                    <div className="qlab__q-top">
                      <span className="qlab__q-title">{q.title}</span>
                      <span className={`qlab__diff-badge ${q.difficulty.toLowerCase()}`}>
                        {q.difficulty}
                      </span>
                    </div>

                    <div className="qlab__q-meta">
                      <span className="qlab__q-topic">{q.topic}</span>
                      <span className="qlab__q-accept">{q.acceptance} pass</span>
                    </div>

                    <div className="qlab__q-companies">
                      {q.companies.map(c => (
                        <span key={c} className="qlab__company-pill">{c}</span>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>

            <div className="qlab__sidebar-footer">
              <a href="https://dkoder.co.in/practice" className="qlab__view-all-link">
                <span>Access Complete Company Library (1,200+ Qs)</span>
                <span>➔</span>
              </a>
            </div>
          </div>

          {/* Right: Full Interactive Developer Studio Workspace */}
          <div className="qlab__editor-pane">
            {/* Studio Navigation & Language Bar */}
            <div className="qlab__toolbar">
              <div className="qlab__tabs">
                <button
                  type="button"
                  className={`qlab__tab-btn ${activeTab === 'editor' ? 'active' : ''}`}
                  onClick={() => setActiveTab('editor')}
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M4.5 2A2.5 2.5 0 0 0 2 4.5v7A2.5 2.5 0 0 0 4.5 14h7a2.5 2.5 0 0 0 2.5-2.5v-7A2.5 2.5 0 0 0 11.5 2h-7zM3 4.5A1.5 1.5 0 0 1 4.5 3h7A1.5 1.5 0 0 1 13 4.5v7a1.5 1.5 0 0 1-1.5 1.5h-7A1.5 1.5 0 0 1 3 11.5v-7z"/>
                  </svg>
                  <span>Code Editor</span>
                </button>
                <button
                  type="button"
                  className={`qlab__tab-btn ${activeTab === 'problem' ? 'active' : ''}`}
                  onClick={() => setActiveTab('problem')}
                >
                  <span>Problem Spec</span>
                </button>
                <button
                  type="button"
                  className={`qlab__tab-btn ${activeTab === 'telemetry' ? 'active' : ''}`}
                  onClick={() => setActiveTab('telemetry')}
                >
                  <span>Big-O Bounds</span>
                </button>
              </div>

              {/* Language Selector */}
              <div className="qlab__lang-selector">
                {(['typescript', 'python', 'cpp', 'java'] as const).map(lang => (
                  <button
                    key={lang}
                    type="button"
                    className={`qlab__lang-btn ${selectedLang === lang ? 'active' : ''}`}
                    onClick={() => setSelectedLang(lang)}
                  >
                    {lang === 'typescript' ? 'TypeScript' : lang === 'python' ? 'Python' : lang === 'cpp' ? 'C++ 20' : 'Java 17'}
                  </button>
                ))}
              </div>
            </div>

            {/* Dynamic Tab Body */}
            {activeTab === 'editor' && (
              <div className="qlab__code-window">
                <div className="qlab__code-scroll">
                  <div className="qlab__line-numbers">
                    {codeLines.map((_, idx) => (
                      <span key={idx} className="line-num">{idx + 1}</span>
                    ))}
                  </div>
                  <pre className="qlab__code-content">
                    <code>
                      {codeLines.map((line, idx) => (
                        <div key={idx} className="code-line">
                          {line || ' '}
                        </div>
                      ))}
                    </code>
                  </pre>
                </div>
              </div>
            )}

            {activeTab === 'problem' && (
              <div className="qlab__spec-window">
                <h4 className="spec-title">{activeQuestion.title}</h4>
                <p className="spec-desc">{activeQuestion.description}</p>

                <div className="spec-section">
                  <div className="spec-subtitle">Example Walkthrough</div>
                  <pre className="spec-pre"><code>{activeQuestion.example}</code></pre>
                </div>

                <div className="spec-section">
                  <div className="spec-subtitle">Constraints</div>
                  <ul className="spec-list">
                    {activeQuestion.constraints.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'telemetry' && (
              <div className="qlab__telemetry-window">
                <div className="telemetry-card">
                  <span className="lbl">Time Complexity</span>
                  <span className="val lime">{activeQuestion.timeComplexity}</span>
                  <span className="note">Verified with micro-benchmark sandbox profiling</span>
                </div>
                <div className="telemetry-card">
                  <span className="lbl">Space Complexity</span>
                  <span className="val violet">{activeQuestion.spaceComplexity}</span>
                  <span className="note">Auxiliary memory allocation within runtime bounds</span>
                </div>
                <div className="telemetry-card">
                  <span className="lbl">Company Recurrence</span>
                  <span className="val">{activeQuestion.companies.join(' · ')}</span>
                  <span className="note">Reported by placed alumni in 2024–2025 hiring cycles</span>
                </div>
              </div>
            )}

            {/* Interactive Terminal / Test Runner Tray */}
            <div className="qlab__test-tray">
              <div className="qlab__test-header">
                <div className="test-tabs">
                  {activeQuestion.testCases.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`test-tab ${activeTestIndex === i ? 'active' : ''}`}
                      onClick={() => setActiveTestIndex(i)}
                    >
                      Case {i + 1}
                    </button>
                  ))}
                </div>

                <div className="test-actions">
                  <button
                    type="button"
                    className={`run-code-btn ${executionState}`}
                    onClick={handleRunCode}
                    disabled={executionState === 'running'}
                  >
                    {executionState === 'running' ? (
                      <>
                        <span className="btn-spinner" />
                        <span>Compiling & Testing...</span>
                      </>
                    ) : executionState === 'done' ? (
                      <>
                        <span>✓ Tests Passed (14ms)</span>
                      </>
                    ) : (
                      <>
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                          <polygon points="3,1 11,6 3,11" />
                        </svg>
                        <span>Run Test Suite</span>
                      </>
                    )}
                  </button>

                  <a href="https://dkoder.co.in/practice" className="submit-solution-btn">
                    <span>Submit to Judge ➔</span>
                  </a>
                </div>
              </div>

              {/* Live Test Case Output */}
              <div className="qlab__test-console">
                {executionState === 'done' ? (
                  <div className="console-result success">
                    <div className="console-verdict">
                      <span className="verdict-tag">ACCEPTED</span>
                      <span className="verdict-speed">Runtime: 14 ms (Beats 97.4% of submissions)</span>
                      <span className="verdict-mem">Memory: 41.8 MB</span>
                    </div>
                    <div className="console-case">
                      <span className="lbl">Input:</span>
                      <code>{activeQuestion.testCases[activeTestIndex].input}</code>
                    </div>
                    <div className="console-case">
                      <span className="lbl">Expected:</span>
                      <code>{activeQuestion.testCases[activeTestIndex].expected}</code>
                    </div>
                    <div className="console-case">
                      <span className="lbl">Actual:</span>
                      <code className="lime">{activeQuestion.testCases[activeTestIndex].expected}</code>
                    </div>
                  </div>
                ) : (
                  <div className="console-preview">
                    <span className="lbl">Input Test Case:</span>
                    <code>{activeQuestion.testCases[activeTestIndex].input}</code>
                    <span className="lbl expected-lbl">Expected Output:</span>
                    <code>{activeQuestion.testCases[activeTestIndex].expected}</code>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
