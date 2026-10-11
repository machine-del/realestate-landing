import { Approach } from "./Approach";
import { CaseStudy } from "./CaseStudy";
import { Contact } from "./Contact";
import { FAQ } from "./FAQ";
import { PinnedSection } from "./PinnedSection";
import { Problem } from "./Problem";
import { Process } from "./Process";
import { Services } from "./Services";
import { WhyUs } from "./WhyUs";

export function Sections() {
	return (
		<>
			<Problem />
			<PinnedSection
				id="problem-pin"
				innerId="problemInner"
				progressId="problemProgress"
				lines={["Мы меняем", "сам подход", "к контенту."]}
			/>
			<Approach />
			<Services />
			<CaseStudy />
			<WhyUs />
			<Process />
			<PinnedSection
				id="expert-pin"
				innerId="expertInner"
				progressId="expertProgress"
				lines={["Вам не нужно", "становиться блогером.", "Вам нужно стать", "заметным экспертом."]}
				subtitle="Мы берём на себя контент, чтобы вы могли заниматься недвижимостью и бизнесом."
			/>
			<FAQ />
			<Contact />
		</>
	);
}
