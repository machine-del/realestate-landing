import styled from "@emotion/styled";
import * as UI from "../../shared/ui/StyledElements";
import { Footer } from "./Footer";

const PolicyHeader = styled.header`
	padding: 24px 0;
	border-bottom: 1px solid var(--border);
`;

const PolicyLogo = styled(UI.Anchor)`
	color: var(--text);
	font-size: 20px;
	font-weight: 800;
	letter-spacing: -0.02em;
	text-decoration: none;
`;

const PolicyMain = styled.main`
	min-height: 65vh;
	padding: 64px 0 96px;

	@media (min-width: 768px) {
		padding: 96px 0 120px;
	}
`;

const PolicyTitle = styled(UI.H1)`
	max-width: 900px;
	margin: 0 0 20px;
	color: var(--text);
	font-size: clamp(36px, 7vw, 64px);
	font-weight: 800;
	line-height: 1.05;
	letter-spacing: -0.04em;
`;

const PolicyUpdated = styled.p`
	margin: 0 0 40px;
	color: var(--text-dim);
	font-size: 14px;
`;

const PolicyBody = styled.div`
	max-width: 820px;
	color: var(--text-muted);
	font-size: 16px;
	font-weight: 300;
	line-height: 1.75;

	h2 {
		margin: 36px 0 12px;
		color: var(--text);
		font-size: 21px;
		font-weight: 700;
		line-height: 1.3;
	}

	p,
	ul {
		margin: 0 0 16px;
	}

	ul {
		padding-left: 24px;
	}

	a {
		color: var(--gold);
	}
`;

export function PrivacyPolicyPage() {
	return (
		<>
			<PolicyHeader>
				<UI.Container>
					<PolicyLogo href="/">VERTEX</PolicyLogo>
				</UI.Container>
			</PolicyHeader>
			<PolicyMain>
				<UI.Container>
					<PolicyTitle>Политика обработки персональных данных</PolicyTitle>
					<PolicyUpdated>Дата публикации: 12 октября 2026 года</PolicyUpdated>
					<PolicyBody>
						<p>
							Настоящая политика описывает обработку персональных данных на сайте VERTEX. Владелец
							сайта — Черненко Андрей Сергеевич (далее — Владелец сайта).
						</p>

						<h2>1. Какие данные и для чего обрабатываются</h2>
						<p>
							Через форму обратной связи Владелец сайта получает имя, указанный посетителем контакт
							(например, телефон или имя пользователя Telegram) и необязательный комментарий.
							Эти сведения используются только для ответа на обращение и обсуждения проекта.
						</p>
						<p>
							Не указывайте в комментарии специальные категории персональных данных, сведения о
							здоровье, документы, пароли и иные данные, не нужные для ответа на обращение.
						</p>

						<h2>2. Передача и хранение обращений</h2>
						<p>
							Чтобы доставить заявку, её содержание передаётся Telegram и ВКонтакте и становится
							доступно получателям, настроенным для уведомлений Владельца сайта. Эти сервисы обрабатывают
							данные по собственным правилам и политике конфиденциальности.
						</p>
						<p>
							Сайт не ведёт собственную базу заявок. Данные обращения хранятся в переписке
							соответствующего сервиса, пока сообщение не будет удалено Владельцем сайта или самим
							сервисом. Технический провайдер сайта или API может обрабатывать технические данные,
							необходимые для работы и защиты сервиса, согласно настройкам выбранного хостинга.
						</p>

						<h2>3. Технические данные и ограничение отправки</h2>
						<p>
							Для ограничения повторных заявок API может использовать IP-адрес посетителя. Если
							подключено общее хранилище Redis, в нём сохраняется только хеш IP-адреса на 60 секунд.
							Браузер сайта также сохраняет время окончания минутной паузы в локальном хранилище.
							Эта отметка нужна только для работы интерфейса и не содержит полей заявки.
						</p>

						<h2>4. Основание и срок обработки</h2>
						<p>
							Отправляя форму и отмечая отдельное поле согласия, посетитель выражает согласие на
							обработку указанных данных для ответа на обращение. Обработка для этой цели
							прекращается, когда обращение рассмотрено и необходимость в данных отпала, если
							дальнейшее хранение не требуется по закону или для защиты прав Владельца сайта.
						</p>

						<h2>5. Права посетителя и отзыв согласия</h2>
						<p>
							По вопросам обработки данных, для запроса сведений, уточнения или удаления данных,
							а также для отзыва согласия напишите на{" "}
							<a href="mailto:chernenko.estate1@gmail.com">chernenko.estate1@gmail.com</a>.
							В обращении укажите, как с вами связаться, и опишите запрос. Для защиты данных
							Владелец сайта может попросить подтвердить, что запрос относится к вам.
						</p>

						<h2>6. Контакт владельца сайта</h2>
						<p>
							Черненко Андрей Сергеевич
							<br />
							Email: <a href="mailto:chernenko.estate1@gmail.com">chernenko.estate1@gmail.com</a>
						</p>
					</PolicyBody>
				</UI.Container>
			</PolicyMain>
			<Footer homeHref="/" />
		</>
	);
}
