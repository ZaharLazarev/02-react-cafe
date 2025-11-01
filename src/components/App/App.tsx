import css from "./App.module.css";
import CafeInfo from "../CafeInfo/CafeInfo";
import Notification from "../Notification/Notification";
import VoteOptions from "../VoteOptions/VoteOptions";
import VoteStats from "../VoteStats/VoteStats";
import { useState } from "react";
import Votes from "../../types/votes";
import { VoteType } from "../../types/votes";
function App() {
  const [votes, setVotes] = useState<Votes>({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  const handleVote = (type: VoteType) => {
    setVotes({
      ...votes,
      [type]: votes[type] + 1,
    });
  };

  const resetVotes = () => {
    setVotes({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };
  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0;

  return (
    <div className={css.app}>
      <CafeInfo></CafeInfo>
      {totalVotes ? (
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={true}
        ></VoteOptions>
      ) : (
        <VoteOptions
          onVote={handleVote}
          onReset={resetVotes}
          canReset={false}
        ></VoteOptions>
      )}
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        ></VoteStats>
      ) : (
        <Notification></Notification>
      )}
    </div>
  );
}

export default App;
