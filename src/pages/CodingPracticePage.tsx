import React, { useState } from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { Play, CheckCircle2, RotateCcw, Send, Terminal, Sparkles, Copy, Check } from 'lucide-react'

const STARTER_CODES: Record<string, string> = {
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
  python: `def twoSum(nums: list[int], target: int) -> list[int]:
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []`,
  cpp: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); ++i) {
        int comp = target - nums[i];
        if (seen.find(comp) != seen.end()) {
            return {seen[comp], i};
        }
        seen[nums[i]] = i;
    }
    return {};
}`,
  java: `import java.util.HashMap;

class Solution {
    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        return new int[0];
    }
}`
}

export default function CodingPracticePage() {
  const [language, setLanguage] = useState<'typescript' | 'python' | 'cpp' | 'java'>('typescript')
  const [code, setCode] = useState(STARTER_CODES.typescript)
  const [activeTab, setActiveTab] = useState<'description' | 'solution'>('description')
  const [running, setRunning] = useState(false)
  const [outputResult, setOutputResult] = useState<{
    status: 'PASS' | 'IDLE' | 'FAIL'
    time: string
    memory: string
    testCasesPassed: number
    totalTestCases: number
  }>({
    status: 'IDLE',
    time: '',
    memory: '',
    testCasesPassed: 0,
    totalTestCases: 3
  })
  const [copied, setCopied] = useState(false)

  const handleLangChange = (newLang: 'typescript' | 'python' | 'cpp' | 'java') => {
    setLanguage(newLang)
    setCode(STARTER_CODES[newLang])
  }

  const handleRunCode = () => {
    setRunning(true)
    setTimeout(() => {
      setRunning(false)
      setOutputResult({
        status: 'PASS',
        time: '34 ms (beats 88.4%)',
        memory: '42.1 MB',
        testCasesPassed: 3,
        totalTestCases: 3
      })
    }, 600)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '90vh', background: '#FAF8F5', paddingTop: '72px' }}>
        {/* Top Problem Header Bar */}
        <div style={{ background: '#FFFFFF', borderBottom: '1.5px solid #17191C', padding: '0.75rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '0.6875rem', fontWeight: 800, textTransform: 'uppercase', background: '#DCFCE7', color: '#166534', padding: '0.2rem 0.55rem', borderRadius: '9999px', border: '1px solid #16A34A' }}>
              Easy · 3.5–5 LPA
            </span>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 800, color: '#17191C', margin: 0 }}>
              Two Sum: Target Subarray Index Matching
            </h1>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#8875FF' }}>
              TCS NQT & Infosys InfyTQ 2026
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handleRunCode}
              disabled={running}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.25rem',
                fontSize: '0.8125rem',
                fontWeight: 800,
                background: '#F5FF38',
                color: '#17191C',
                border: '1.5px solid #17191C',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                boxShadow: '2px 2px 0px #17191C'
              }}
            >
              <Play size={13} fill="#17191C" />
              <span>{running ? 'Running Tests...' : 'Run Code'}</span>
            </button>
            <button
              type="button"
              onClick={handleRunCode}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.55rem 1.25rem',
                fontSize: '0.8125rem',
                fontWeight: 800,
                background: '#17191C',
                color: '#FFFFFF',
                borderRadius: '0.5rem',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <Send size={13} style={{ color: '#F5FF38' }} />
              <span>Submit Solution</span>
            </button>
          </div>
        </div>

        {/* 2-Column Split Workspace */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.4fr', minHeight: 'calc(90vh - 120px)' }}>
          {/* Left Panel: Problem Statement */}
          <div style={{ background: '#FFFFFF', borderRight: '1.5px solid #17191C', padding: '2rem', overflowY: 'auto' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #E2E8F0', paddingBottom: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setActiveTab('description')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  color: activeTab === 'description' ? '#17191C' : '#64748B',
                  borderBottom: activeTab === 'description' ? '2px solid #17191C' : 'none',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Problem Description
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('solution')}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  color: activeTab === 'solution' ? '#17191C' : '#64748B',
                  borderBottom: activeTab === 'solution' ? '2px solid #17191C' : 'none',
                  paddingBottom: '0.5rem',
                  cursor: 'pointer'
                }}
              >
                Optimal Solution & Hint
              </button>
            </div>

            {activeTab === 'description' ? (
              <div>
                <p style={{ fontSize: '0.9375rem', color: '#334155', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Given an array of integers <code style={{ background: '#FAF8F5', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', fontWeight: 700 }}>nums</code> and an integer <code style={{ background: '#FAF8F5', padding: '0.2rem 0.4rem', borderRadius: '0.25rem', fontWeight: 700 }}>target</code>, return <em>indices of the two numbers such that they add up to target</em>.
                </p>
                <p style={{ fontSize: '0.875rem', color: '#64748B', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  You may assume that each input would have <strong>exactly one solution</strong>, and you may not use the same element twice. You can return the answer in any order.
                </p>

                <h3 style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', marginBottom: '0.5rem' }}>
                  Example 1:
                </h3>
                <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', fontFamily: 'monospace', fontSize: '0.8125rem', marginBottom: '1.25rem' }}>
                  <div><strong>Input:</strong> nums = [2, 7, 11, 15], target = 9</div>
                  <div><strong>Output:</strong> [0, 1]</div>
                  <div><strong>Explanation:</strong> Because nums[0] + nums[1] == 9, we return [0, 1].</div>
                </div>

                <h3 style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', marginBottom: '0.5rem' }}>
                  Example 2:
                </h3>
                <div style={{ background: '#FAF8F5', padding: '1rem', borderRadius: '0.75rem', border: '1px solid #E2E8F0', fontFamily: 'monospace', fontSize: '0.8125rem', marginBottom: '1.5rem' }}>
                  <div><strong>Input:</strong> nums = [3, 2, 4], target = 6</div>
                  <div><strong>Output:</strong> [1, 2]</div>
                </div>

                <h3 style={{ fontSize: '0.875rem', fontWeight: 800, textTransform: 'uppercase', color: '#17191C', marginBottom: '0.5rem' }}>
                  Constraints:
                </h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.8125rem', color: '#475569', fontFamily: 'monospace' }}>
                  <li>• 2 &lt;= nums.length &lt;= 10⁴</li>
                  <li>• -10⁹ &lt;= nums[i] &lt;= 10⁹</li>
                  <li>• -10⁹ &lt;= target &lt;= 10⁹</li>
                  <li>• Only one valid answer exists.</li>
                </ul>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '1rem', fontWeight: 800, color: '#17191C', marginBottom: '0.5rem' }}>
                  Algorithm Complexity Breakdown
                </h3>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                  <strong>Time Complexity:</strong> O(N) — We traverse the list containing N elements exactly once.
                  Each lookup in the hash table costs only O(1) time on average.
                </p>
                <p style={{ fontSize: '0.875rem', color: '#475569', lineHeight: 1.6 }}>
                  <strong>Space Complexity:</strong> O(N) — The extra space required depends on the number of items stored in the hash map, which stores up to N elements.
                </p>
              </div>
            )}
          </div>

          {/* Right Panel: Code Editor & Console Output */}
          <div style={{ display: 'flex', flexDirection: 'column', background: '#17191C' }}>
            {/* Editor Top Bar */}
            <div style={{ background: '#20242D', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
              <div style={{ display: 'flex', gap: '0.35rem' }}>
                {(['typescript', 'python', 'cpp', 'java'] as const).map(lang => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => handleLangChange(lang)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      borderRadius: '0.35rem',
                      border: 'none',
                      background: language === lang ? '#F5FF38' : 'transparent',
                      color: language === lang ? '#17191C' : '#94A3B8',
                      cursor: 'pointer',
                      textTransform: 'capitalize'
                    }}
                  >
                    {lang === 'cpp' ? 'C++' : lang}
                  </button>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setCode(STARTER_CODES[language])}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                >
                  <RotateCcw size={12} />
                  <span>Reset</span>
                </button>
                <button
                  type="button"
                  onClick={handleCopy}
                  style={{ background: 'none', border: 'none', color: '#94A3B8', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem', cursor: 'pointer' }}
                >
                  {copied ? <Check size={12} style={{ color: '#F5FF38' }} /> : <Copy size={12} />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            {/* Code Text Area */}
            <textarea
              value={code}
              onChange={e => setCode(e.target.value)}
              spellCheck={false}
              style={{
                flex: 1,
                width: '100%',
                background: '#17191C',
                color: '#F8FAFC',
                fontFamily: `'JetBrains Mono', 'Courier New', monospace`,
                fontSize: '0.875rem',
                lineHeight: 1.6,
                padding: '1.25rem',
                border: 'none',
                outline: 'none',
                resize: 'none',
                minHeight: '320px'
              }}
            />

            {/* Bottom Console Panel */}
            <div style={{ background: '#111317', borderTop: '1px solid rgba(255, 255, 255, 0.1)', padding: '1rem 1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: '#94A3B8', letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Terminal size={14} />
                  <span>Execution Output Console</span>
                </span>
                {outputResult.status === 'PASS' && (
                  <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#16A34A', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <CheckCircle2 size={14} />
                    <span>Accepted · All {outputResult.testCasesPassed}/{outputResult.totalTestCases} Tests Passed</span>
                  </span>
                )}
              </div>

              {outputResult.status === 'PASS' ? (
                <div style={{ background: '#1E232F', borderRadius: '0.5rem', padding: '0.75rem 1rem', fontFamily: 'monospace', fontSize: '0.8125rem' }}>
                  <div style={{ color: '#38BDF8', marginBottom: '0.25rem' }}>
                    ✔ Test Case 1: nums=[2,7,11,15], target=9 → Output: [0, 1] (Match)
                  </div>
                  <div style={{ color: '#38BDF8', marginBottom: '0.25rem' }}>
                    ✔ Test Case 2: nums=[3,2,4], target=6 → Output: [1, 2] (Match)
                  </div>
                  <div style={{ color: '#38BDF8' }}>
                    ✔ Test Case 3: nums=[3,3], target=6 → Output: [0, 1] (Match)
                  </div>
                  <div style={{ marginTop: '0.5rem', fontSize: '0.75rem', color: '#94A3B8' }}>
                    Runtime: {outputResult.time} | Memory: {outputResult.memory}
                  </div>
                </div>
              ) : (
                <div style={{ fontSize: '0.8125rem', color: '#64748B', fontFamily: 'monospace' }}>
                  Click “Run Code” to execute your solution against test cases.
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
